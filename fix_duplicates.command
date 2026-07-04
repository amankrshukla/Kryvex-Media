#!/bin/bash
###############################################################################
# WebTech Core — Duplicate Page Fixer
# ---------------------------------------------------------------------------
# District-hub pages currently exist TWICE: once loose in the "Webtech " folder
# and again inside "Webtech /Bihar District Pages/". This removes the redundant
# copies — but SAFELY:
#
#   * It compares each pair BYTE-FOR-BYTE (cmp). Only EXACT duplicates are touched.
#   * Removed files are MOVED to a recoverable "_DUPLICATES_REMOVED_<timestamp>"
#     folder — nothing is hard-deleted. Delete that folder yourself once happy.
#   * If a pair DIFFERS (two real versions), BOTH are kept and flagged for review.
#   * The root copy is kept as canonical (that's where every other page lives).
#
# RUN:
#   Preview only :  bash fix_duplicates.command --dry
#   Fix for real :  bash fix_duplicates.command
###############################################################################
set -u

MODE_DRY=0
for a in "$@"; do case "$a" in --dry) MODE_DRY=1 ;; esac; done

ROOT="$(cd "$(dirname "$0")" && pwd)"
SRC="$(find "$ROOT" -maxdepth 1 -type d -name 'Webtech*' 2>/dev/null | head -1)"
[ -z "$SRC" ] && SRC="$ROOT"
SUB="$SRC/Bihar District Pages"
TS="$(date +%Y%m%d-%H%M%S)"
TRASH="$ROOT/_DUPLICATES_REMOVED_$TS"
LOG="$ROOT/duplicate_fix_log_$TS.txt"

mkdir -p "$TRASH"
: > "$LOG"
echo "WebTech Core — Duplicate Page Fixer"            | tee -a "$LOG"
echo "  Source     : $SRC"                            | tee -a "$LOG"
echo "  Subfolder  : $SUB"                            | tee -a "$LOG"
echo "  Dry run    : $MODE_DRY"                       | tee -a "$LOG"
echo "-----------------------------------------------" | tee -a "$LOG"

if [ ! -d "$SUB" ]; then
  echo "No 'Bihar District Pages' subfolder found — nothing to fix." | tee -a "$LOG"
  rmdir "$TRASH" 2>/dev/null
  exit 0
fi

removed=0; differ=0; uniq=0; other=0

while IFS= read -r f; do
  [ -f "$f" ] || continue
  base="$(basename "$f")"

  # leave non-page assets alone
  case "$base" in
    support.js|*.js|*.css|.DS_Store|.thumbnail)
      echo "ASSET (left in place)          : $base" | tee -a "$LOG"
      other=$((other+1)); continue ;;
  esac

  rootfile="$SRC/$base"
  if [ -f "$rootfile" ]; then
    if cmp -s "$f" "$rootfile"; then
      if [ "$MODE_DRY" -eq 1 ]; then
        echo "WOULD REMOVE (identical)       : Bihar District Pages/$base" | tee -a "$LOG"
      else
        mv "$f" "$TRASH/$base"
        echo "REMOVED  (identical -> trash)  : Bihar District Pages/$base" | tee -a "$LOG"
      fi
      removed=$((removed+1))
    else
      echo "DIFFERS  (KEPT - review needed) : Bihar District Pages/$base  <-- root copy is different!" | tee -a "$LOG"
      differ=$((differ+1))
    fi
  else
    echo "UNIQUE   (no root copy, KEPT)   : Bihar District Pages/$base" | tee -a "$LOG"
    uniq=$((uniq+1))
  fi
done < <(find "$SUB" -maxdepth 1 -type f 2>/dev/null)

echo "-----------------------------------------------" | tee -a "$LOG"
echo "Identical duplicates removed : $removed" | tee -a "$LOG"
echo "Differing pairs (review)     : $differ" | tee -a "$LOG"
echo "Unique kept                  : $uniq"   | tee -a "$LOG"
echo "Assets left in place         : $other"  | tee -a "$LOG"

rmdir "$TRASH" 2>/dev/null   # removes the trash folder only if nothing was moved
if [ -d "$TRASH" ]; then
  echo "-----------------------------------------------" | tee -a "$LOG"
  echo "Removed copies are RECOVERABLE here:"            | tee -a "$LOG"
  echo "  $TRASH"                                        | tee -a "$LOG"
  echo "Delete that folder once the site checks out."    | tee -a "$LOG"
fi
echo "Log saved: $LOG"
