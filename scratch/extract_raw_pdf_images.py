from pypdf import PdfReader
import os

SRC = "/Users/batman/Desktop/techfittech/Jordan Fitness Catalogue - HQ.pdf"
reader = PdfReader(SRC)

page_num = 16 # urethane-dumbbells
page_idx = page_num - 1
page = reader.pages[page_idx]
images = page.images if hasattr(page, 'images') else []

print(f"Page {page_num} has {len(images)} images.")
os.makedirs("scratch/page16_raw", exist_ok=True)

for i, img in enumerate(images):
    # Try to determine extension
    ext = "bin"
    if hasattr(img, 'name') and img.name:
        ext = img.name.split('.')[-1]
    
    # Let's check typical image formats by signature
    data = img.data
    if data[:4] == b'\xff\xd8\xff\xe0' or data[:4] == b'\xff\xd8\xff\xe1':
        ext = "jpg"
    elif data[:8] == b'\x89PNG\r\n\x1a\n':
        ext = "png"
    elif data[:4] == b'\x00\x00\x00\x0c': # JP2 signature
        ext = "jp2"
    elif data[:4] == b'\xff\x4f\xff\x51': # JPEG2000 codestream (J2K)
        ext = "j2k"
        
    out_path = f"scratch/page16_raw/img_{i}.{ext}"
    with open(out_path, "wb") as f:
        f.write(data)
    print(f"Image {i}: saved raw to {out_path}, size={len(data)} bytes, detected_ext={ext}")
