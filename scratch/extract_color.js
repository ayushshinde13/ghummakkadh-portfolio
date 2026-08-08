const Jimp = require('jimp');

async function extractColor() {
  const image = await Jimp.read('public/images/logo.png');
  const colors = {};
  
  image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
    const red = this.bitmap.data[idx + 0];
    const green = this.bitmap.data[idx + 1];
    const blue = this.bitmap.data[idx + 2];
    const alpha = this.bitmap.data[idx + 3];
    
    if (alpha > 128) { // Skip transparent
        const hex = '#' + ((1 << 24) + (red << 16) + (green << 8) + blue).toString(16).slice(1).toUpperCase();
        if (hex !== '#FFFFFF' && hex !== '#000000') {
            colors[hex] = (colors[hex] || 0) + 1;
        }
    }
  });

  const sortedColors = Object.entries(colors).sort((a, b) => b[1] - a[1]);
  console.log("Most common colors:");
  for (let i = 0; i < 5 && i < sortedColors.length; i++) {
    console.log(`${sortedColors[i][0]}: ${sortedColors[i][1]} pixels`);
  }
}

extractColor().catch(console.error);
