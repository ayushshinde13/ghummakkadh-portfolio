const fs = require('fs');
const file = 'd:/ghumakkadh_landing/ghummakkadh-portfolio/src/components/hero/HeroImage.tsx';
let content = fs.readFileSync(file, 'utf8');
const lines = content.split(/\r?\n/);

// We need to replace lines 94 to 225. (index 93 to 224)
// Let's verify the lines first
if (lines[93].includes('Phone Mockup: Shifted upside') && lines[224].includes('</div>')) {
    lines.splice(93, 132, 
        '        {/* Phone Image */}', 
        '        <img src="/images/phone.png" alt="Phone App Mockup" className="relative mx-auto w-[300px] sm:w-[320px] h-auto object-contain z-10 rounded-[44px] shadow-[0_20px_50px_rgba(30,41,59,0.22)]" />'
    );
    fs.writeFileSync(file, lines.join('\n'));
    console.log('Successfully replaced phone mockup with image.');
} else {
    console.log('Error: Lines did not match expected start/end.');
}
