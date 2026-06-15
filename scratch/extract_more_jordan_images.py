import os
import io
from pypdf import PdfReader
from PIL import Image

SRC = "/Users/batman/Desktop/techfittech/Jordan Fitness Catalogue - HQ.pdf"
DEST = "/Users/batman/Desktop/techfittech/public/assets/images/products/jordan"
os.makedirs(DEST, exist_ok=True)

# 1-indexed pages to image slugs
page_mapping = {
    151: "blazepod",
    161: "punch-bag",
    35: "kettlebell-rack",
    46: "plate-rack",
    56: "barbell-rack"
}

reader = PdfReader(SRC)
total = 0

print("Starting additional image extraction...")
for page_num, slug in page_mapping.items():
    page_idx = page_num - 1
    if page_idx >= len(reader.pages):
        print(f"Page {page_num} ({slug}): Out of bounds")
        continue

    page = reader.pages[page_idx]
    images = page.images if hasattr(page, 'images') else []
    
    if not images:
        print(f"Page {page_num} ({slug}): No images found")
        continue

    # Find the largest image by data length
    best_img = None
    best_len = 0
    for idx, img in enumerate(images):
        if len(img.data) > best_len:
            best_len = len(img.data)
            best_img = img

    if best_img:
        try:
            im = Image.open(io.BytesIO(best_img.data))
            out_path = os.path.join(DEST, f"{slug}.jpg")
            
            if im.mode in ("RGBA", "LA", "P"):
                im = im.convert("RGB")
            elif im.mode != "RGB":
                im = im.convert("RGB")
                
            im.save(out_path, "JPEG", quality=92)
            print(f"Page {page_num} ({slug}): Extracted & saved -> {out_path}, size={im.size}, original_bytes={best_len}")
            total += 1
        except Exception as e:
            print(f"Page {page_num} ({slug}): Failed to process image ({best_len} bytes): {e}")
    else:
        print(f"Page {page_num} ({slug}): No suitable image found")

print(f"\nExtraction complete. Total images extracted: {total}/{len(page_mapping)}")
