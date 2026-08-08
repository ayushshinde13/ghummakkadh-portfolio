const fs = require('fs');
const path = require('path');

const colorMap = {
  '#7DD3FC': '#FF7700',
  '#7dd3fc': '#FF7700',
  '#0284C7': '#CC5F00',
  '#0284c7': '#CC5F00',
  '#38BDF8': '#E66B00',
  '#38bdf8': '#E66B00',
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
