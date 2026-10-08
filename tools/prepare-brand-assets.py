"""
Prepare brand assets for KonveksiKampus from the collected logo/avatar.

Inputs (archived originals):
  assets/brand/source/instagram-avatar-original.png  (400x400, IG avatar = logo)
  assets/brand/source/linktree-og-original.jpg       (1200x630 banner)

Outputs:
  public/brand/  -> served assets (favicons, og, logo variants)
  assets/brand/  -> working copies / larger versions

The avatar has a dark gradient background with a vignette. We:
  - locate the non-background bounding box and crop to it (with a margin)
  - auto-contrast to lift the metallic/text detail
  - produce square logo variants on the brand background
  - produce an OG image (1200x630) with the logo on a cleaned brand backdrop
  - produce a full favicon set

Run: python tools/prepare-brand-assets.py
"""
from __future__ import annotations

import os
from PIL import Image, ImageOps, ImageFilter, ImageDraw

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "assets", "brand", "source")
PUB_BRAND = os.path.join(ROOT, "public", "brand")
ASSET_BRAND = os.path.join(ROOT, "assets", "brand")
os.makedirs(PUB_BRAND, exist_ok=True)

BRAND_BG = (14, 14, 18)  # #0e0e12 (matches the site palette)


def log(*a):
    print(*a)


# --- 1. load + find content bounding box ------------------------------------
def content_bbox(im: Image.Image, thresh: int = 26) -> tuple[int, int, int, int]:
    """Bounding box of pixels that differ from the local background (the corners)."""
    g = im.convert("L")
    w, h = g.size
    corner = (0, 0, max(2, w // 20), max(2, h // 20))
    bg = g.crop(corner)
    bg_mean = sum(bg.getdata()) / len(bg.getdata())
    px = g.load()
    minx, miny, maxx, maxy = w, h, 0, 0
    step = 1
    for y in range(0, h, step):
        for x in range(0, w, step):
            if abs(px[x, y] - bg_mean) > thresh:
                if x < minx:
                    minx = x
                if y < miny:
                    miny = y
                if x > maxx:
                    maxx = x
                if y > maxy:
                    maxy = y
    if minx > maxx or miny > maxy:
        return (0, 0, w, h)
    return (minx, miny, maxx + 1, maxy + 1)


def clean_logo(im: Image.Image, margin_pct: float = 0.06) -> Image.Image:
    """Crop to content, add a small margin, auto-contrast on the RGB channels."""
    im = im.convert("RGB")
    l, t, r, b = content_bbox(im)
    mc = int(max(r - l, b - t) * margin_pct)
    l2, t2 = max(0, l - mc), max(0, t - mc)
    r2, b2 = min(im.width, r + mc), min(im.height, b + mc)
    crop = im.crop((l2, t2, r2, b2))
    # square it (center)
    side = max(crop.width, crop.height)
    sq = Image.new("RGB", (side, side), BRAND_BG)
    sq.paste(crop, ((side - crop.width) // 2, (side - crop.height) // 2))
    sq = ImageOps.autocontrast(sq, cutoff=1)
    return sq


def saved(path: str, im: Image.Image, **kw):
    im.save(path, **kw)
    log(f"  -> {os.path.relpath(path, ROOT)}  {im.size[0]}x{im.size[1]}  {os.path.getsize(path) // 1024} KB")


# --- 2. produce assets -------------------------------------------------------
def main():
    av = Image.open(os.path.join(SRC, "instagram-avatar-original.png"))
    og_src = Image.open(os.path.join(SRC, "linktree-og-original.jpg"))

    log("Cleaning logo (crop + autocontrast)...")
    logo = clean_logo(av)
    log(f"  cleaned: {logo.size[0]}x{logo.size[1]}")

    # master square logo (transparent-ish: keep brand bg to preserve the metallic look)
    logo.save(os.path.join(ASSET_BRAND, "logo-master.png"))
    log(f"  -> assets/brand/logo-master.png")

    log("\nFavicons + app icons:")
    ico = logo.resize((256, 256), Image.LANCZOS)
    ico.save(os.path.join(PUB_BRAND, "favicon.ico"), sizes=[(16, 16), (32, 32), (48, 48)])
    sizes = {
        "favicon-16x16.png": 16,
        "favicon-32x32.png": 32,
        "favicon-48x48.png": 48,
        "apple-touch-icon.png": 180,
        "icon-192.png": 192,
        "icon-512.png": 512,
    }
    for name, size in sizes.items():
        saved(os.path.join(PUB_BRAND, name), logo.resize((size, size), Image.LANCZOS))

    log("\nDisplay logo variants:")
    saved(os.path.join(PUB_BRAND, "logo-256.png"), logo.resize((256, 256), Image.LANCZOS))
    saved(os.path.join(ASSET_BRAND, "logo-1024.png"), logo.resize((1024, 1024), Image.LANCZOS))

    # wordmark-ish: logo + name on a dark plate (for headers / og)
    log("\nHorizontal lockup (logo + wordmark):")
    lh = 160
    lg = logo.resize((lh, lh), Image.LANCZOS)
    plate = Image.new("RGB", (lg.width + 520, lh), BRAND_BG)
    plate.paste(lg, (0, 0))
    d = ImageDraw.Draw(plate)
    try:
        from PIL import ImageFont
        # try a common Windows font; fall back to default
        fp = r"C:\Windows\Fonts\segoeuib.ttf"
        f1 = ImageFont.truetype(fp, 44) if os.path.exists(fp) else ImageFont.load_default()
        f2 = ImageFont.truetype(fp, 22) if os.path.exists(fp) else ImageFont.load_default()
    except Exception:
        f1 = f2 = ImageFont.load_default()
    d.text((lg.width + 24, 42), "Konveksi Kampus", font=f1, fill=(245, 245, 247))
    d.text((lg.width + 26, 96), "VENDOR KONVEKSI YOGYAKARTA", font=f2, fill=(242, 185, 12))
    saved(os.path.join(PUB_BRAND, "logo-lockup.png"), plate)
    saved(os.path.join(ASSET_BRAND, "logo-lockup@3x.png"), plate.resize((plate.width * 2, plate.height * 2), Image.LANCZOS))

    # OpenGraph 1200x630 (dark brand backdrop + centered logo + name)
    log("\nOpenGraph image (1200x630):")
    og = Image.new("RGB", (1200, 630), BRAND_BG)
    # subtle radial glow behind the logo (single accent, not decoration)
    glow = Image.new("L", og.size, 0)
    gd = ImageDraw.Draw(glow)
    gd.ellipse((360, 60, 840, 540), fill=70)
    glow = glow.filter(ImageFilter.GaussianBlur(90))
    og.paste(Image.new("RGB", og.size, (32, 20, 22)), (0, 0), glow)
    ol = logo.resize((360, 360), Image.LANCZOS)
    og.paste(ol, ((1200 - 360) // 2, 70))
    d = ImageDraw.Draw(og)
    try:
        from PIL import ImageFont
        fp = r"C:\Windows\Fonts\segoeuib.ttf"
        fb = ImageFont.truetype(fp, 56) if os.path.exists(fp) else ImageFont.load_default()
        fs = ImageFont.truetype(fp, 28) if os.path.exists(fp) else ImageFont.load_default()
    except Exception:
        fb = fs = ImageFont.load_default()
    t1 = "Konveksi Kampus"
    w1 = d.textlength(t1, font=fb)
    d.text(((1200 - w1) / 2, 450), t1, font=fb, fill=(245, 245, 247))
    t2 = "Vendor Konveksi Yogyakarta — sejak 2012"
    w2 = d.textlength(t2, font=fs)
    d.text(((1200 - w2) / 2, 522), t2, font=fs, fill=(161, 161, 181))
    saved(os.path.join(PUB_BRAND, "og-image.jpg"), og, quality=90)
    saved(os.path.join(ASSET_BRAND, "og-image-source.png"), og)

    # also keep the original linktree banner as a reference asset
    og_src.save(os.path.join(ASSET_BRAND, "linktree-banner-original.jpg"), quality=90)
    log("  -> assets/brand/linktree-banner-original.jpg (reference)")

    log("\nDone.")


if __name__ == "__main__":
    main()
