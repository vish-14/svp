const fs = require('fs');

const file = 'src/pages/Home.jsx';
let content = fs.readFileSync(file, 'utf-8');

// Update TCS Logo (Handling both occurrences in marquee)
content = content.replace(/https:\/\/upload\.wikimedia\.org\/wikipedia\/commons\/b\/b1\/Tata_Consultancy_Services_Logo\.svg/g, 'https://tse2.mm.bing.net/th/id/OIP.P9yyQtAg8rgIRmiJLuL9GwHaD4?w=1536&h=804&rs=1&pid=ImgDetMain&o=7&rm=3');

// Update Deloitte Logo (Handling both occurrences in marquee)
content = content.replace(/https:\/\/upload\.wikimedia\.org\/wikipedia\/commons\/5\/56\/Deloitte\.svg/g, 'https://equalengineers.com/wp-content/uploads/2018/08/Deloitte-logo-1024x223.png');

fs.writeFileSync(file, content, 'utf-8');
console.log('Updated TCS and Deloitte logos.');
