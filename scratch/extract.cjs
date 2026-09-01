const fs = require('fs');

const fileContent = fs.readFileSync('c:\\Users\\VISHWAS\\Downloads\\SVpw\\src\\pages\\ProgramDetails.jsx', 'utf8');
const match = fileContent.match(/const programsData = (\{[\s\S]*?\n\});\n\nconst ProgramDetails/);

if (match) {
  const dataString = match[1];
  // Safely evaluate to get the JS object
  let dataObj;
  try {
    eval('dataObj = ' + dataString);
    fs.writeFileSync('c:\\Users\\VISHWAS\\Downloads\\SVpw\\src\\content\\programDetails.json', JSON.stringify(dataObj, null, 2));
    console.log('Successfully extracted programDetails.json');
  } catch (e) {
    console.error('Eval error:', e);
  }
} else {
  console.log('Could not match programsData object');
}
