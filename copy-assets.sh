#!/usr/bin/env bash
# Copies every asset the site references out of the Claude Design bundle into
# site/assets/, renaming to ASCII so no path needs URL-encoding.
#
# Run from the site/ folder:  bash copy-assets.sh
set -uo pipefail

SRC="$(cd "$(dirname "${BASH_SOURCE[0]}")/../project" && pwd)"
DST="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/assets"
mkdir -p "$DST"

missing=0

copy() {
  if [ -f "$SRC/$1" ]; then
    cp "$SRC/$1" "$DST/$2"
  else
    echo "MISSING: $1" >&2
    missing=$((missing + 1))
  fi
}

# Some source names contain Cyrillic with combining accents; match on a prefix.
copyglob() {
  local match
  match="$(find "$SRC/uploads" -maxdepth 1 -name "$1" -print -quit 2>/dev/null)"
  if [ -n "$match" ]; then
    cp "$match" "$DST/$2"
  else
    echo "MISSING (glob): $1" >&2
    missing=$((missing + 1))
  fi
}

# ── Shared: identity and sidebar ────────────────────────────────────────────
copy "uploads/Frame 40.png"                 "avatar.png"
copy "uploads/data-78806b2a.json"           "logo-light.json"
copy "uploads/data-2f221fea.json"           "logo-dark.json"
copy "uploads/urzhanovaa.webp"              "og.webp"
copy "uploads/Frame 48096218.png"           "logo-wildberries.png"
copy "uploads/Frame 48096272.png"           "logo-mujo.png"
copy "uploads/Frame 48096189.png"           "logo-teamly.png"
copy "uploads/Adelina Urzhanova 1.png"      "logo-au-1.png"
copy "uploads/Adelina Urzhanova Logo 1.png" "logo-au-2.png"

# ── Home page: tile covers and banners ──────────────────────────────────────
copy "uploads/Дефолт.png"                   "stack-back.png"
copy "uploads/1440.png"                     "stack-mid.png"
copy "uploads/Главная.png"                  "stack-front.png"
copy "uploads/Моб-aa2a2055.mp4"             "animation.mp4"
copy "uploads/1-5cc62d10.png"               "shot-1.png"
copy "uploads/2-ea420bc3.png"               "shot-2.png"
copy "uploads/3-e1215fdc.png"               "shot-3.png"
copy "uploads/4-b4cc61fe.png"               "shot-4.png"
copy "uploads/5-9a5655ca.png"               "shot-5.png"
copy "uploads/image 19.png"                 "fan-left.png"
copy "uploads/image 20.png"                 "fan-right.png"
copy "uploads/image 21.png"                 "fan-center.png"
copy "uploads/Coursera Course PDF 1.png"    "cert.png"
copy "uploads/Group 56.png"                 "cover-egemen.png"
copy "uploads/Frame 48096255.png"           "cover-desk-setup.png"
copy "avatars-collage.png"                  "avatars-collage.png"
copy "uploads/AVIF to PNG Image.png"          "book-1.png"
copy "uploads/Download from Convertio.png"    "book-2.png"
copy "uploads/Convertio Conversion Image.png" "book-3.png"
copy "uploads/AVIF to PNG Convertio.png"      "book-4.png"
copy "uploads/AVIF to PNG 1798x2856.png"      "book-5.png"
copy "uploads/AVIF to PNG 1683x2392.png"      "book-6.png"

# ── MUJO AI ─────────────────────────────────────────────────────────────────
copy "uploads/Обложка проекта.png"          "mujo-hero.png"
for i in 1 2 3 4 5 6 7 8 9 10; do
  copy "uploads/$i.png" "mujo-slide-$i.png"
done
copy "uploads/11.png"                       "mujo-shot-1.png"
copy "uploads/12.png"                       "mujo-shot-2.png"
copy "uploads/13.png"                       "mujo-shot-3.png"
copy "uploads/14.png"                       "mujo-shot-4.png"
copy "uploads/Frame 48096109.png"           "mujo-shot-5.png"
copy "uploads/Frame 48096107.png"           "mujo-shot-6.png"

# ── Payment split ───────────────────────────────────────────────────────────
copy "uploads/Обложка проекта-1.png"        "payment-hero.png"

# ── AirTrip ─────────────────────────────────────────────────────────────────
copy "uploads/Обложка проекта-2.png"        "airtrip-hero.png"
copy "uploads/1.webp"                       "airtrip-1.webp"
copy "uploads/2.webp"                       "airtrip-2.webp"

# ── Animation challenge ─────────────────────────────────────────────────────
copy "uploads/Обложка проекта-0b021213.png" "animation-hero.png"
anim_srcs=(
  "1-37073626.webp" "2-2f7d0e16.webp" "11.webp" "4.webp" "25.webp"
  "7.webp" "3.webp" "5.webp" "8.webp" "9.webp"
  "10.webp" "12.webp" "13.webp" "14.webp" "15.webp"
  "16.webp" "17.webp" "18.webp" "19.webp" "20.webp"
  "21.webp" "22.webp" "23.webp" "24.webp" "26.webp"
  "27.webp" "28.webp" "29.webp" "30.webp" "6.mp4"
)
n=1
for src in "${anim_srcs[@]}"; do
  ext="${src##*.}"
  copy "uploads/$src" "$(printf 'anim-%02d.%s' "$n" "$ext")"
  n=$((n + 1))
done

# ── Activities ──────────────────────────────────────────────────────────────
copy    "uploads/IMG_6322-46f5c230.jpg"            "activities-1.jpg"
copyglob "Снимок*-88392d47.png"                    "activities-2.png"
copyglob "Графическ*сертификат.webp"               "activities-3.webp"
copy    "uploads/1 место.webp"                     "activities-4.webp"
copy    "uploads/PNG to WEBP Google.webp"          "activities-5.webp"
copy    "uploads/Отсканированные документы.webp"     "activities-6.webp"
copy    "uploads/Отсканированные документы (1).webp" "activities-7.webp"
copy    "uploads/Отсканированные документы (2).webp" "activities-8.webp"
copy    "uploads/Adelina Urzhanova.webp"           "activities-9.webp"
copy    "uploads/Future Learn (1).webp"            "activities-10.webp"
copy    "uploads/HTML for Designers.webp"          "activities-11.webp"
copy    "uploads/Skyeng PNG to WEBP.webp"          "activities-12.webp"

# ── Desk setup ──────────────────────────────────────────────────────────────
copy "uploads/Frame 1948754655.png"         "desk-hero.png"
copy "uploads/image 77-7c62ce9a.png"        "desk-1.png"
copy "uploads/pasted-1787590536232-0.png"   "desk-2.png"
copy "uploads/image 78.png"                 "desk-3.png"
copy "uploads/image 83.png"                 "desk-4.png"
copy "uploads/image 84.png"                 "desk-5.png"
copy "uploads/image 85.png"                 "desk-6.png"
copy "uploads/image 86.png"                 "desk-7.png"
copy "uploads/image 79.png"                 "desk-interior-1.png"
copy "uploads/image 80.png"                 "desk-interior-2.png"
copy "uploads/image 81.png"                 "desk-interior-3.png"

echo "Copied $(ls -1 "$DST" | wc -l | tr -d ' ') files into assets/ ($missing missing)"
