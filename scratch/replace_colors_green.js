const fs = require('fs');
const path = require('path');

const colorMap = {
  '#FF7700': '#77FF00',
  '#ff7700': '#77FF00',
  '#E66B00': '#66E000',
  '#e66b00': '#66E000',
  '#FFF0E5': '#F0FFEA',
  '#fff0e5': '#F0FFEA',
  '#CC5F00': '#4D9900',
  '#cc5f00': '#4D9900',
  '#FFE0CC': '#E0FFCC',
  '#ffe0cc': '#E0FFCC',
  '#FFF5EB': '#F5FFF0',
  '#fff5eb': '#F5FFF0'
};

function walkSync(dir, filelist = []) {
  fs.readdirSync(dir).forEach(file => {
    const dirFile = path.join(dir, file);
    try {
      filelist = walkSync(dirFile, filelist);
    } catch (err) {
      if (err.code === 'ENOTDIR' || err.code === 'EBUSY') {
        if (dirFile.endsWith('.tsx') || dirFile.endsWith('.ts') || dirFile.endsWith('.css')) {
          filelist.push(dirFile);
        }
      } else {
        throw err;
      }
    }
  });
  return filelist;
}

const files = walkSync('D:\\ghumakkadh_landing\\ghummakkadh-portfolio\\src');

let totalReplacements = 0;

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  for (const [oldColor, newColor] of Object.entries(colorMap)) {
    // Escape hash for regex
    const regex = new RegExp(oldColor, 'g');
    if (regex.test(content)) {
      content = content.replace(regex, newColor);
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file}`);
    totalReplacements++;
  }
}

console.log(`Finished. Updated ${totalReplacements} files.`);
