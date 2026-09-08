#!/bin/bash
# ============================================================================
# Скачивает к себе два файла, которые сайт пока берёт с чужих серверов:
# плеер анимации логотипа и шрифт Inter. Нужен интернет; запускается один раз.
# Двойной клик по этому файлу.
# ============================================================================

cd "$(dirname "$0")" || exit 1

VENDOR="vendor"
FONTS="$VENDOR/fonts"
UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36"

mkdir -p "$FONTS" || exit 1

fail() {
  echo ""
  echo "  НЕ ПОЛУЧИЛОСЬ: $1"
  echo "  Проверь интернет и запусти файл ещё раз."
  echo ""
  read -r -p "  Нажми Enter, чтобы закрыть."
  exit 1
}

echo ""
echo "  ── Плеер анимации ─────────────────────────────────────────"
curl -fsSL "https://cdn.jsdelivr.net/npm/lottie-web@5.12.2/build/player/lottie_light.min.js" \
  -o "$VENDOR/lottie_light.min.js" || fail "не скачался плеер анимации"
echo "  готово: lottie_light.min.js ($(du -h "$VENDOR/lottie_light.min.js" | cut -f1))"

echo ""
echo "  ── Шрифт Inter ────────────────────────────────────────────"
curl -fsSL -A "$UA" \
  "https://fonts.googleapis.com/css2?family=Inter:wght@400..600&display=swap" \
  -o "$VENDOR/inter.css" || fail "не скачалось описание шрифта"

# Каждый файл шрифта, на который ссылается стилевой файл, кладём рядом.
urls=$(grep -o 'https://fonts\.gstatic\.com[^)]*' "$VENDOR/inter.css" | sort -u)
[ -n "$urls" ] || fail "в описании шрифта не нашлось ссылок на файлы"

count=0
while IFS= read -r url; do
  name="$(basename "$url")"
  curl -fsSL -A "$UA" "$url" -o "$FONTS/$name" || fail "не скачался $name"
  count=$((count + 1))
  echo "  готово: $name ($(du -h "$FONTS/$name" | cut -f1))"
done <<< "$urls"

# И переписываем ссылки на свои копии.
sed -i '' -E 's#https://fonts\.gstatic\.com/[^)]*/([^/)]+)#fonts/\1#g' "$VENDOR/inter.css"

echo ""
echo "  ───────────────────────────────────────────────────────────"
echo "  Скачано файлов шрифта: $count"
echo "  Всё лежит в папке vendor. Напиши об этом Клоду — он переключит"
echo "  сайт на эти копии."
echo ""
read -r -p "  Нажми Enter, чтобы закрыть."
