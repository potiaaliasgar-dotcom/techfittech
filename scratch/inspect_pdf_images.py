import io
from pypdf import PdfReader
from PIL import Image
import os

SRC = "/Users/batman/Desktop/techfittech/Jordan Fitness Catalogue - HQ.pdf"
reader = PdfReader(SRC)

page_num = 16 # urethane-dumbbells
page_idx = page_num - 1
page = reader.pages[page_idx]
images = page.images if hasattr(page, 'images') else []

print(f"Page {page_num} has {len(images)} images.")
os.makedirs("scratch/page16_imgs", exist_ok=True)

for i, img in enumerate(images):
    try:
        im = Image.open(io.BytesIO(img.data))
        out_path = f"scratch/page16_imgs/img_{i}.{im.format.lower()}"
        im.save(out_path)
        print(f"Image {i}: saved to {out_path}, size={im.size}, format={im.format}, data_size={len(img.data)} bytes")
    except Exception as e:
        print(f"Image {i}: failed: {e}")
