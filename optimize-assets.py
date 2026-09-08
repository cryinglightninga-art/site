#!/usr/bin/env python3
"""
Resize and re-encode everything in assets/ to the size the page actually uses.

The design bundle ships images at full resolution — book covers at 2298px wide
that render at 133px, an avatar at 1080px that renders at 44px. That is ~15MB
of downloads for a page whose images occupy less than one screen.

Every entry below caps the *longest side* at roughly twice the largest size the
image is displayed at, which is the most a retina screen can use. Sources stay
untouched in ../project/uploads; run copy-assets.sh then this script to rebuild.

Usage:  python3 optimize-assets.py
"""

import os
import shutil
import subprocess
import sys
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    sys.exit("Pillow is required:  pip3 install --user Pillow")

ASSETS = Path(__file__).resolve().parent / "assets"

# filename pattern -> (max longest side in px, quality)
# Sizes are 2x the largest rendered size, rounded up a little.
RULES = [
    # Sidebar: 18px company logos, 44px avatar.
    ("logo-wildberries.png", 64, 90),
    ("logo-mujo.png", 64, 90),
    ("logo-teamly.png", 64, 90),
    ("logo-au-1.png", 64, 90),
    ("logo-au-2.png", 64, 90),

    # Home tiles: a tile is at most ~490px wide on desktop.
    ("stack-*.png", 800, 82),
    ("fan-*.png", 800, 82),
    ("shot-*.png", 800, 82),
    ("cert.png", 800, 82),
    ("cover-*.png", 800, 82),

    # Bookshelf: rendered at 133x202 at the very largest.
    ("book-*.png", 420, 80),

    # Avatars band: ~312px tall, drifts sideways.
    ("avatars-collage.png", 2200, 78),

    # Article heroes: full width of the 1000px work column.
    ("*-hero.png", 1600, 80),

    # MUJO slideshow and shot grid.
    ("mujo-slide-*.png", 1400, 80),
    ("mujo-shot-*.png", 1000, 80),

    # Activities masonry: ~320px columns on desktop.
    ("activities-*.jpg", 800, 80),
    ("activities-*.png", 800, 80),
    ("activities-*.webp", 800, 80),

    # Desk setup: half-column photos, ~490px.
    ("desk-*.png", 1000, 80),

    # The animation-gallery clips are deliberately absent: they are animated
    # WebP, and is_animated() below sends them through untouched.
]

# Left alone: SVG, Lottie JSON, and the favicon (browsers want a real PNG
# there, and at 128px it is already tiny).
# cover-egemen.webp is stored lossless on purpose: it is a screenshot of a
# page of text, and lossy compression turns small type to mush.
SKIP = {"wb.svg", "og.webp", "cover-egemen.webp"}
# Browsers want a real bitmap for the tab icon, and the sidebar avatar is
# drawn at 44px; neither is worth a WebP.
KEEP_AS_PNG = {"avatar.png": (128, 95), "favicon.png": (100, 95)}

# Videos, re-encoded with ffmpeg when it is available. The bundle's clips are
# encoded very inefficiently — the home page one drops from 985K to 113K at a
# conservative quality setting, same size and duration.
VIDEOS = {"animation.mp4": 900, "anim-30.mp4": 900}


def is_animated(path):
    """True for animated WebP and GIF.

    Pillow reads only the first frame of these unless it is asked to save every
    one, so re-encoding an animation the ordinary way silently turns it into a
    still. The 29 clips on the animation-challenge page are animated WebP, at
    800px and 3.4MB for the set — already the size they are displayed at, and
    loaded one screen at a time on a page of their own. So they are left alone.
    """
    try:
        with Image.open(path) as img:
            return getattr(img, "n_frames", 1) > 1
    except Exception:
        return False


def rule_for(name):
    for pattern, side, quality in RULES:
        if Path(name).match(pattern):
            return side, quality
    return None


def video_bitrate(path):
    """Bits per second, or None if ffprobe cannot say."""
    try:
        out = subprocess.run(
            ["ffprobe", "-v", "error", "-show_entries", "format=duration,size",
             "-of", "default=noprint_wrappers=1:nokey=1", str(path)],
            capture_output=True, text=True, check=True)
        duration, size = out.stdout.split()
        return float(size) * 8 / float(duration)
    except Exception:
        return None


def shrink_video(path, max_width, size_before):
    """Re-encode with ffmpeg if it is installed; otherwise leave the file be."""
    if shutil.which("ffmpeg") is None:
        return size_before

    # Running this script twice must not cost a second generation of quality.
    # Anything already under 600 kbps has been through here before.
    rate = video_bitrate(path)
    if rate is not None and rate < 600_000:
        return size_before
    tmp = path.with_suffix(".tmp.mp4")
    cmd = [
        "ffmpeg", "-hide_banner", "-loglevel", "error", "-i", str(path),
        "-vf", f"scale='min({max_width},iw)':-2",
        "-c:v", "libx264", "-crf", "24", "-preset", "slow",
        "-an", "-pix_fmt", "yuv420p", "-movflags", "+faststart", "-y", str(tmp),
    ]
    if subprocess.run(cmd).returncode != 0 or not tmp.exists():
        tmp.unlink(missing_ok=True)
        return size_before
    # Only keep it if it actually helped.
    if tmp.stat().st_size < size_before:
        tmp.replace(path)
    else:
        tmp.unlink()
    return path.stat().st_size


def resized(img, max_side):
    w, h = img.size
    if max(w, h) <= max_side:
        return img
    scale = max_side / max(w, h)
    return img.resize((max(1, round(w * scale)), max(1, round(h * scale))), Image.LANCZOS)


def main():
    if not ASSETS.is_dir():
        sys.exit(f"No assets directory at {ASSETS} — run copy-assets.sh first.")

    before = after = 0
    converted = skipped = 0

    for path in sorted(ASSETS.iterdir()):
        if not path.is_file() or path.name.startswith("."):
            continue

        size_before = path.stat().st_size
        before += size_before

        if path.name in SKIP:
            after += size_before
            skipped += 1
            continue

        if path.name in VIDEOS:
            size_after = shrink_video(path, VIDEOS[path.name], size_before)
            after += size_after
            if size_after < size_before:
                converted += 1
                print(f"  {path.name:28s} {size_before // 1024:6d}K -> {size_after // 1024:5d}K  (mp4)")
            else:
                skipped += 1
            continue

        if is_animated(path):
            after += size_before
            skipped += 1
            continue

        # The favicon stays a PNG, just a much smaller one.
        if path.name in KEEP_AS_PNG:
            max_side, _ = KEEP_AS_PNG[path.name]
            with Image.open(path) as probe:
                if max(probe.size) <= max_side:
                    after += size_before
                    skipped += 1
                    continue
            with Image.open(path) as img:
                out = resized(img.convert("RGBA"), max_side)
                out.save(path, "PNG", optimize=True)
            size_after = path.stat().st_size
            after += size_after
            converted += 1
            print(f"  {path.name:28s} {size_before // 1024:6d}K -> {size_after // 1024:5d}K  (png)")
            continue

        rule = rule_for(path.name)
        if rule is None:
            after += size_before
            skipped += 1
            continue

        max_side, quality = rule
        target = path.with_suffix(".webp")

        # Already a WebP no larger than the cap: this is this script's own
        # output from a previous run, and re-encoding it would only soften it.
        if path.suffix.lower() == ".webp":
            with Image.open(path) as probe:
                if max(probe.size) <= max_side:
                    after += size_before
                    skipped += 1
                    continue

        with Image.open(path) as img:
            # Flatten transparency onto white only when the source has none to
            # preserve; WebP keeps alpha, so just carry it through.
            img = img.convert("RGBA" if "A" in img.getbands() else "RGB")
            out = resized(img, max_side)
            out.save(target, "WEBP", quality=quality, method=6)

        if target != path:
            path.unlink()

        size_after = target.stat().st_size
        after += size_after
        converted += 1
        print(f"  {path.name:28s} {size_before // 1024:6d}K -> {size_after // 1024:5d}K  {out.size[0]}x{out.size[1]}")

    print()
    print(f"обработано: {converted}, без изменений: {skipped}")
    print(f"было {before / 1024 / 1024:.1f} МБ -> стало {after / 1024 / 1024:.1f} МБ "
          f"({100 - after * 100 // before}% меньше)")


if __name__ == "__main__":
    main()
