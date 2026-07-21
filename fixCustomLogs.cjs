const fs = require('fs');

const file = 'src/pages/Home.jsx';
let content = fs.readFileSync(file, 'utf-8');

// Replace MSME
content = content.replace('src="https://upload.wikimedia.org/wikipedia/commons/c/cf/MSME_Logo.png"', 'src="https://syprosmartautomation.com/logos/msme-logo.png"');

// Replace ISO
content = content.replace('src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/ISO_Logo_%28Red_square%29.svg/512px-ISO_Logo_%28Red_square%29.svg.png"', 'src="https://isofocus.co.id/wp-content/uploads/2024/03/iso-9001-2015-qms-removebg-preview.png"');

// Replace Tally
content = content.replace('src="https://upload.wikimedia.org/wikipedia/en/thumb/e/eb/Tally_Solutions_Logo.svg/512px-Tally_Solutions_Logo.svg.png"', 'src="https://vishwnet.com/wp-content/uploads/2025/07/Tally-Prime.webp"');

fs.writeFileSync(file, content, 'utf-8');
console.log('Replaced custom URLs');
