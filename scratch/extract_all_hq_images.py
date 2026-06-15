from pypdf import PdfReader
from PIL import Image
import io
import os

SRC = "/Users/batman/Desktop/techfittech/Jordan Fitness Catalogue - HQ.pdf"
DEST = "/Users/batman/Desktop/techfittech/public/assets/images/products/jordan"
os.makedirs(DEST, exist_ok=True)

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
    139: "ignite-pump-set",
    79: "dumbbell-rack"
}

reader = PdfReader(SRC)

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
            # Try to open with Pillow
            im = Image.open(io.BytesIO(best_img.data))
            out_path = os.path.join(DEST, f"{slug}.jpg")
            
            # Convert RGBA, LA or P to RGB before saving as JPEG
            if im.mode in ("RGBA", "LA", "P"):
                im = im.convert("RGB")
            elif im.mode != "RGB":
                im = im.convert("RGB")
                
            im.save(out_path, "JPEG", quality=92)
            print(f"Page {page_num} ({slug}): Extracted & saved -> {out_path}, size={im.size}, format={im.format}, original_bytes={best_len}")
        except Exception as e:
            print(f"Page {page_num} ({slug}): Failed to process largest image ({best_len} bytes): {e}")
    else:
        print(f"Page {page_num} ({slug}): No suitable image found")
