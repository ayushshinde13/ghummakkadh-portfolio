const fs = require('fs');
const path = require('path');

const colorMap = {
  '#F8D84E': '#FF7700',
  '#f8d84e': '#FF7700',
  '#E5C330': '#E66B00',
  '#e5c330': '#E66B00',
  '#EAB308': '#FF7700',
  '#eab308': '#FF7700',
  '#FEF9C3': '#FFF0E5',
  '#fef9c3': '#FFF0E5',
  '#CA8A04': '#CC5F00',
  '#ca8a04': '#CC5F00',
  '#FEF08A': '#FFE0CC',
  '#fef08a': '#FFE0CC',
  '#FFFBEB': '#FFF5EB',
  '#fffbeb': '#FFF5EB'
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
