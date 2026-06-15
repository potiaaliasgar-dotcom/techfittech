from PIL import Image
try:
    im = Image.open("scratch/page16_raw/img_0.jp2")
    im.convert("RGB").save("scratch/page16_raw/img_0_converted.jpg", "JPEG")
    print(f"Success! Converted img_0.jp2 to JPG, size={im.size}")
except Exception as e:
    print(f"Failed to convert img_0.jp2: {e}")

try:
    im1 = Image.open("scratch/page16_raw/img_1.jp2")
    im1.convert("RGB").save("scratch/page16_raw/img_1_converted.jpg", "JPEG")
    print(f"Success! Converted img_1.jp2 to JPG, size={im1.size}")
except Exception as e:
    print(f"Failed to convert img_1.jp2: {e}")
