#!/bin/bash
###############################################################################
# WebTech Core — Live Project Organizer
# ---------------------------------------------------------------------------
# Sorts the flat dump of Canva ".dc.html" exports into a clean folder tree
# that mirrors the hub-and-spoke URL architecture (country > state > district
# > service), so converting to Next.js routes later is a 1:1 mapping.
#
# SAFE BY DEFAULT:
#   * MODE=copy        -> originals are never touched (a clean tree is built).
#   * DRY_RUN=1        -> shows what WOULD happen, moves nothing.
#   * Writes a manifest.csv + coverage_matrix.csv you can audit.
#   * Duplicates and anything it can't classify go to _REVIEW/ (never deleted).
#
# HOW TO RUN:
#   1. Put this file inside:  ".../Webtech Core Live Project/"
#      (the folder that CONTAINS the "Webtech " sub-folder).
#   2. Double-click it (Terminal opens) OR run:  bash organize_webtech.command
#   3. It runs a DRY RUN first and prints the plan. Read manifest.csv.
#   4. When happy, re-run with:  bash organize_webtech.command --go
#   5. To physically MOVE instead of copy (after you trust it):
#         bash organize_webtech.command --go --move
###############################################################################

set -u

# ----------------------------- CONFIG ---------------------------------------
DRY_RUN=1
MODE="copy"                      # copy | move
for arg in "$@"; do
  case "$arg" in
    --go)   DRY_RUN=0 ;;
    --move) MODE="move" ;;
    --copy) MODE="copy" ;;
  esac
done

# Folder this script lives in:
ROOT="$(cd "$(dirname "$0")" && pwd)"

# Auto-detect the source sub-folder (handles the trailing space in "Webtech ").
SRC="$(find "$ROOT" -maxdepth 1 -type d -name 'Webtech*' 2>/dev/null | head -1)"
if [ -z "$SRC" ]; then
  # fall back: maybe the files are loose in ROOT itself
  SRC="$ROOT"
fi

OUT="$ROOT/WebTech Core - Organized"
REVIEW="$OUT/_REVIEW"
MANIFEST="$ROOT/manifest.csv"
COVERAGE="$ROOT/coverage_matrix.csv"
LOG="$ROOT/organize_log.txt"

echo "WebTech Core Organizer"
echo "  Source : $SRC"
echo "  Output : $OUT"
echo "  Mode   : $MODE   Dry-run: $DRY_RUN"
echo "---------------------------------------------------------------"

# ----------------------------- VOCAB ----------------------------------------
# 38 Bihar districts (one per line)
DISTRICTS="Araria
Arwal
Aurangabad
Banka
Begusarai
Bhagalpur
Bhojpur
Buxar
Darbhanga
East Champaran
Gaya
Gopalganj
Jamui
Jehanabad
Kaimur
Katihar
Khagaria
Kishanganj
Lakhisarai
Madhepura
Madhubani
Munger
Muzaffarpur
Nalanda
Nawada
Patna
Purnia
Rohtas
Saharsa
Samastipur
Saran
Sheikhpura
Sheohar
Sitamarhi
Siwan
Supaul
Vaishali
West Champaran"

# Per-district service suffixes (longest first matters; matched as whole words)
SERVICES="Web Development
Graphics Design
Social Media
Google Ads
Email Marketing
Content Marketing
Content Writing
Meta Ads
Web Design
SEO
PPC"

# Standalone service-pillar pages (no district prefix)
PILLARS="SEO
PPC
Email Marketing
Content Marketing
Content Writing
Graphics Design
Web Design
Web Development
Social Media
Social Media Management
Meta Ads
Google Ads
Services"

# Industry pages
INDUSTRIES="Real Estate
Healthcare
Restaurant
Legal
Legal & Professional Services
Home Services
Education
Fitness
Fitness & Wellness
E-Commerce
E-Commerce & D2C
Ecommerce"

# Global / corporate / utility pages
GLOBALS="WebTech Core
Home
About Us
Contact Us
Case Studies
Press Release
Privacy Policy
Terms and Conditions
Resources
Sitemap"

# Geo hubs -> relative target folder under _LOCATIONS
# (handled explicitly in classify())

# ----------------------------- HELPERS --------------------------------------
in_list () {  # $1 = needle, stdin = list
  local needle="$1"
  grep -Fxq "$needle"
}

slug () {  # lowercase, spaces->-, & -> and, strip junk
  printf '%s' "$1" \
    | tr '[:upper:]' '[:lower:]' \
    | sed -e 's/ *& */-and-/g' -e "s/'//g" -e 's/[^a-z0-9]\{1,\}/-/g' \
          -e 's/^-//' -e 's/-$//'
}

# Returns the target RELATIVE path (folder only) for a given base name.
# Echoes "FOLDER|||CATEGORY"
classify () {
  local base="$1"
  # normalise the odd ".standalone" double-extension
  base="${base%.standalone}"

  # 1) district service page?  "<District> <Service>"
  local svc dist prefix
  while IFS= read -r svc; do
    [ -z "$svc" ] && continue
    case "$base" in
      *" $svc")
        prefix="${base% "$svc"}"
        if printf '%s\n' "$DISTRICTS" | in_list "$prefix"; then
          echo "_LOCATIONS/india/bihar/$(slug "$prefix")|||district-service"
          return
        fi
        ;;
    esac
  done <<EOF
$SERVICES
EOF

  # 2) district hub?  "<District>"
  if printf '%s\n' "$DISTRICTS" | in_list "$base"; then
    echo "_LOCATIONS/india/bihar/$(slug "$base")|||district-hub"
    return
  fi

  # 3) geo hubs
  case "$base" in
    "Country"|"India")  echo "_LOCATIONS/india|||geo-hub"; return ;;
    "Bihar")            echo "_LOCATIONS/india/bihar|||state-hub"; return ;;
    "USA")              echo "_LOCATIONS/usa|||geo-hub"; return ;;
    "UK")               echo "_LOCATIONS/uk|||geo-hub"; return ;;
    "Singapore")        echo "_LOCATIONS/singapore|||geo-hub"; return ;;
  esac

  # 4) industry page
  if printf '%s\n' "$INDUSTRIES" | in_list "$base"; then
    echo "02_INDUSTRIES|||industry"; return
  fi

  # 5) service-pillar page
  if printf '%s\n' "$PILLARS" | in_list "$base"; then
    echo "01_SERVICES|||service-pillar"; return
  fi

  # 6) global / corporate
  if printf '%s\n' "$GLOBALS" | in_list "$base"; then
    echo "00_GLOBAL|||global"; return
  fi

  # 7) unknown
  echo "_REVIEW/_uncategorized|||uncategorized"
}

# ----------------------------- RUN ------------------------------------------
: > "$MANIFEST"
echo "original_path,filename,category,target_folder,action" >> "$MANIFEST"
: > "$LOG"

# track claimed targets to catch duplicates (file-based for bash 3.2)
CLAIMED="$(mktemp)"
COVTMP="$(mktemp)"   # lines: district<TAB>service

do_move () {  # $1 src file, $2 dest dir, $3 action-label
  local src="$1" destdir="$2"
  if [ "$DRY_RUN" -eq 0 ]; then
    mkdir -p "$destdir"
    if [ "$MODE" = "move" ]; then mv -n "$src" "$destdir/"; else cp -n "$src" "$destdir/"; fi
  fi
}

count=0
# iterate every file under SRC (depth any), null-safe
while IFS= read -r f; do
  [ -f "$f" ] || continue
  fname="$(basename "$f")"

  # skip the script itself and obvious junk
  case "$fname" in
    organize_webtech.command|manifest.csv|coverage_matrix.csv|organize_log.txt) continue ;;
    .DS_Store|.thumbnail) continue ;;
  esac

  # Canva runtime asset
  case "$fname" in
    support.js|*.js|*.css)
      do_move "$f" "$REVIEW/_assets" "asset"
      echo "$f,$fname,asset,_REVIEW/_assets,$MODE" >> "$MANIFEST"
      count=$((count+1)); continue ;;
  esac

  # only organise .dc.html design files; anything else -> review
  case "$fname" in
    *.dc.html) base="${fname%.dc.html}" ;;
    *) do_move "$f" "$REVIEW/_other" "other"
       echo "$f,$fname,other,_REVIEW/_other,$MODE" >> "$MANIFEST"
       count=$((count+1)); continue ;;
  esac

  res="$(classify "$base")"
  folder="${res%%|||*}"
  cat="${res##*|||}"

  # duplicate detection by intended final path
  finalkey="$folder/$fname"
  if grep -Fxq "$finalkey" "$CLAIMED"; then
    # already have one here -> route this copy to review/_duplicates
    dest="$REVIEW/_duplicates/$folder"
    do_move "$f" "$dest" "duplicate"
    echo "$f,$fname,duplicate-of:$cat,_REVIEW/_duplicates/$folder,$MODE" >> "$MANIFEST"
    count=$((count+1)); continue
  fi
  echo "$finalkey" >> "$CLAIMED"

  dest="$OUT/$folder"
  do_move "$f" "$dest" "$cat"
  echo "$f,$fname,$cat,$folder,$MODE" >> "$MANIFEST"

  # coverage tracking for district-service pages
  if [ "$cat" = "district-service" ]; then
    dpart="$(basename "$folder")"            # district slug
    # derive service = base minus district name
    while IFS= read -r svc; do
      [ -z "$svc" ] && continue
      case "$base" in *" $svc") printf '%s\t%s\n' "$dpart" "$svc" >> "$COVTMP"; break ;; esac
    done <<EOF
$SERVICES
EOF
  fi

  count=$((count+1))
done < <(find "$SRC" -type f 2>/dev/null)

# ----------------------------- COVERAGE MATRIX ------------------------------
{
  echo "district,SEO,Web Development,Google Ads,Social Media,Graphics Design"
  printf '%s\n' "$DISTRICTS" | while IFS= read -r d; do
    ds="$(slug "$d")"
    row="$d"
    for s in "SEO" "Web Development" "Google Ads" "Social Media" "Graphics Design"; do
      if grep -Fq "$(printf '%s\t%s' "$ds" "$s")" "$COVTMP" 2>/dev/null; then row="$row,Y"; else row="$row,-"; fi
    done
    echo "$row"
  done
} > "$COVERAGE"

rm -f "$CLAIMED" "$COVTMP"

echo "---------------------------------------------------------------"
echo "Processed $count files."
echo "Manifest : $MANIFEST"
echo "Coverage : $COVERAGE"
if [ "$DRY_RUN" -eq 1 ]; then
  echo ""
  echo ">>> DRY RUN ONLY — nothing was moved or copied."
  echo ">>> Review manifest.csv, then re-run:  bash \"$0\" --go"
else
  echo ""
  echo ">>> DONE ($MODE). Clean tree at: $OUT"
  echo ">>> Originals left in place. Delete the old folder yourself once verified."
fi
