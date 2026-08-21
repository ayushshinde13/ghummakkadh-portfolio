const fs = require('fs');
const file = 'd:/ghumakkadh_landing/ghummakkadh-portfolio/src/app/(landing)/ride/RideSection.tsx';
let content = fs.readFileSync(file, 'utf8');
const lines = content.split(/\r?\n/);

if (lines[99].includes('w-[360px]') && lines[280].trim() === '</div>') {
    lines.splice(99, 182, 
        '            <img src="/images/phone.png" alt="Ride Booking App Mockup" className="w-[360px] h-auto object-contain drop-shadow-2xl" />'
    );
    fs.writeFileSync(file, lines.join('\n'));
    console.log('Successfully replaced ride page phone mockup with image.');
} else {
    console.log('Error: Lines did not match expected start/end.');
    console.log('Line 100:', lines[99]);
    console.log('Line 281:', lines[280]);
}
