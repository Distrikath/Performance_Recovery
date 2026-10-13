#!/usr/bin/env python3
"""Generate responsive WebP variants from assets/source/.

Usage (from the thesavagegroup/ folder):
    python3 tools/images.py

Requires Pillow (pip install Pillow). Writes resized images to
assets/img/<name>-<width>.webp and a manifest (assets/img/manifest.json)
that the build reads for widths and intrinsic dimensions.
"""
import json
from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "assets" / "source"
OUT = ROOT / "assets" / "img"
WIDTHS = [480, 800, 1200, 1600, 2000]
EXTS = {".jpg", ".jpeg", ".png", ".webp"}


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    for old in OUT.glob("*.webp"):
        old.unlink()
    manifest = {}
    for path in sorted(SRC.iterdir()):
        if path.suffix.lower() not in EXTS:
            continue
        name = path.stem
        im = ImageOps.exif_transpose(Image.open(path)).convert("RGB")
        w, h = im.size
        widths = [x for x in WIDTHS if x < w] + [min(w, WIDTHS[-1])]
        for width in sorted(set(widths)):
            height = round(h * width / w)
            im.resize((width, height), Image.LANCZOS).save(
                OUT / f"{name}-{width}.webp", "WEBP", quality=80, method=6
            )
        manifest[name] = {"width": w, "height": h, "widths": sorted(set(widths))}
        print(f"{name}: {w}x{h} -> {sorted(set(widths))}")
    (OUT / "manifest.json").write_text(json.dumps(manifest, indent=2) + "\n")


if __name__ == "__main__":
    main()
