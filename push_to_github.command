#!/bin/bash
###############################################################################
# WebTech Core — One-Click GitHub Push
# ---------------------------------------------------------------------------
# Pushes the contents of this project folder to your existing GitHub repo.
#
# SAFE BY DEFAULT:
#   * First run = PREVIEW. It clones your repo, stages the changes, and shows
#     you EXACTLY what would change (git status) — but pushes NOTHING.
#   * Only when you re-run with  --go  does it commit and push.
#   * Junk (logs, .DS_Store, the _DUPLICATES trash, the Organized copy) is excluded.
#
# ONE-TIME SETUP:
#   1. Edit the two CONFIG lines below (your repo URL + branch).
#   2. Make sure git can log in to GitHub. Easiest:
#        - Install GitHub CLI, then run:  gh auth login
#        - (or have an SSH key / saved token already configured)
#      NOTE: never paste a token into this file.
#
# RUN:
#   Preview :  bash push_to_github.command
#   Push    :  bash push_to_github.command --go
###############################################################################
set -u

# ======================= CONFIG (pre-filled) ================================
REPO_URL="https://github.com/amankrshukla/webtechcore-website.git"  # your repo
BRANCH=""   # empty = auto-detect the repo's default branch (main/master)
# ============================================================================

GO=0; for a in "$@"; do case "$a" in --go) GO=1 ;; esac; done
ROOT="$(cd "$(dirname "$0")" && pwd)"
MSG="Update WebTech Core site content — $(date '+%Y-%m-%d %H:%M')"

command -v git >/dev/null 2>&1 || { echo "git is not installed. Run:  xcode-select --install"; exit 1; }

WORK="${TMPDIR:-/tmp}/webtechcore_push"
rm -rf "$WORK"

echo "Cloning $REPO_URL ..."
if [ -n "$BRANCH" ]; then
  git clone -b "$BRANCH" "$REPO_URL" "$WORK" 2>/dev/null || git clone "$REPO_URL" "$WORK" 2>/dev/null || CLONE_FAIL=1
else
  git clone "$REPO_URL" "$WORK" 2>/dev/null || CLONE_FAIL=1
fi
if [ "${CLONE_FAIL:-0}" = "1" ]; then
  echo "Clone failed. Check: (1) the repo URL is correct, (2) the repo exists,"
  echo "(3) you're authenticated (try:  gh auth login )."
  exit 1
fi

echo "Copying project files into the repo (excluding junk) ..."
rsync -a \
  --exclude '.git' \
  --exclude '.DS_Store' \
  --exclude '.thumbnail' \
  --exclude '_DUPLICATES_REMOVED_*' \
  --exclude 'duplicate_fix_log_*.txt' \
  --exclude 'manifest.csv' \
  --exclude 'coverage_matrix.csv' \
  --exclude 'organize_log.txt' \
  --exclude 'WebTech Core - Organized' \
  "$ROOT/" "$WORK/"

cd "$WORK" || exit 1
[ -z "$BRANCH" ] && BRANCH="$(git rev-parse --abbrev-ref HEAD)"
echo "Target branch: $BRANCH"
git add -A

echo ""
echo "================== CHANGES TO BE PUSHED =================="
git status --short
echo "========================================================="
CHANGED="$(git status --porcelain | wc -l | tr -d ' ')"
echo "$CHANGED file change(s) staged."

if [ "$GO" -eq 0 ]; then
  echo ""
  echo ">>> PREVIEW ONLY — nothing was pushed."
  echo ">>> If the list above looks right, run:  bash \"$0\" --go"
  exit 0
fi

if [ "$CHANGED" -eq 0 ]; then
  echo "Nothing new to push. Repo already up to date."
  exit 0
fi

git commit -m "$MSG" >/dev/null
if git push origin "$BRANCH"; then
  echo ""
  echo ">>> DONE. Pushed $CHANGED change(s) to $REPO_URL ($BRANCH)."
  echo ">>> If GitHub Pages / Vercel is connected, your site will rebuild shortly."
else
  echo "Push failed — usually an auth issue. Run:  gh auth login   then retry."
  exit 1
fi
