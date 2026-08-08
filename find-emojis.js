const fs = require('fs');
const path = require('path');

const emojiRegex = /[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu;

function findEmojisInDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      findEmojisInDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      if (emojiRegex.test(content)) {
        console.log(`Found emojis in ${fullPath}`);
        const lines = content.split('\n');
        lines.forEach((line, index) => {
          if (emojiRegex.test(line)) {
            console.log(`Line ${index + 1}: ${line.trim()}`);
          }
        });
      }
    }
  }
}

findEmojisInDir(path.join(__dirname, 'src'));
