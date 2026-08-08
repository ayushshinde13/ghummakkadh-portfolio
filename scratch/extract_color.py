from PIL import Image
from collections import Counter
import sys

try:
    img = Image.open('D:/ghumakkadh_landing/ghummakkadh-portfolio/public/images/logo.png')
    img = img.convert('RGB')
    pixels = list(img.getdata())
    pixels = [p for p in pixels if sum(p) < 700 and sum(p) > 50] # filter very light and very dark
    most_common = Counter(pixels).most_common(5)
    for color, count in most_common:
        hex_color = '#{:02x}{:02x}{:02x}'.format(*color)
        print(f"{hex_color} - count: {count}")
except Exception as e:
    print(f"Error: {e}")
