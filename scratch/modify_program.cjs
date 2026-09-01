const fs = require('fs');

const path = 'c:\\Users\\VISHWAS\\Downloads\\SVpw\\src\\pages\\ProgramDetails.jsx';
const fileContent = fs.readFileSync(path, 'utf8');

// The match that we used to extract it
const match = fileContent.match(/const programsData = \{[\s\S]*?\n\};\n\n/);

if (match) {
  const newContent = fileContent.replace(match[0], "import programsData from '../content/programDetails.json';\n\n");
  fs.writeFileSync(path, newContent);
  console.log('Successfully updated ProgramDetails.jsx');
} else {
  console.log('Could not match programsData object');
}
