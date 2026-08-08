const Jimp = require('jimp');

async function cropImages() {
  const files = ['img2.png', 'img_3.png', 'img4.png'];
  
  for (const file of files) {
    const imgPath = `public/images/${file}`;
    const image = await Jimp.read(imgPath);
    
    const w = image.bitmap.width;
    const h = image.bitmap.height;
    
    // Crop the top 18% of the image
    const cropHeight = Math.floor(h * 0.18);
    image.crop(0, cropHeight, w, h - cropHeight);
    
    await image.writeAsync(imgPath);
    console.log(`Cropped ${file}`);
  }
}

cropImages().catch(console.error);
