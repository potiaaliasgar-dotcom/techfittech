import os
import io
from pypdf import PdfReader
from PIL import Image

SRC = "/Users/batman/Desktop/techfittech/Jordan Fitness Catalogue - HQ.pdf"
DEST = "/Users/batman/Desktop/techfittech/public/assets/images/products/jordan"
os.makedirs(DEST, exist_ok=True)

# 1-indexed pages to image slugs
page_mapping = {
    16: "urethane-dumbbells",
    22: "hex-rubber-dumbbells",
    19: "chrome-dumbbells",
    145: "neoprene-dumbbells",
    44: "urethane-plates",
    39: "rubber-bumper-plates",
    54: "aluminium-bar",
    33: "neoprene-kettlebells",
    114: "double-grip-medicine-balls",
    111: "sandbags",
    112: "slam-balls",
    105: "rope-trainer",
    210: "airex-corona-mat",
    139: "ignite-pump-set",
    79: "dumbbell-rack"
}

reader = PdfReader(SRC)
total = 0

print("Starting image extraction...")
for page_num, slug in page_mapping.items():
    # pypdf pages are 0-indexed
    page_idx = page_num - 1
    if page_idx >= len(reader.pages):
        print(f"Page {page_num} is out of bounds (total pages: {len(reader.pages)})")
        continue

    page = reader.pages[page_idx]
    images = page.images if hasattr(page, 'images') else []
    
    if not images:
        print(f"Page {page_num} ({slug}): No images found")
        continue

    best = None
    best_size = 0
    for img in images:
        data = img.data
        if len(data) > best_size:
            best_size = len(data)
            best = img

    if best:
        try:
            # Open with Pillow, convert to RGB and save as JPG
            im = Image.open(io.BytesIO(best.data))
            out_path = os.path.join(DEST, f"{slug}.jpg")
            im_rgb = im.convert('RGB')
            im_rgb.save(out_path, 'JPEG')
            print(f"Page {page_num} ({slug}): Extracted -> {out_path} ({best_size} bytes, format={im.format}, size={im.size})")
            total += 1
        except Exception as e:
            print(f"Page {page_num} ({slug}): Error during conversion: {e}")
    else:
        print(f"Page {page_num} ({slug}): No suitable image found")

print(f"\nExtraction complete. Total images extracted: {total}/15")
