const fs = require('fs');
const csv = require('csv-parser');


if (fs.existsSync('canada.txt')) {
  fs.unlinkSync('canada.txt');
}

if (fs.existsSync('usa.txt')) {
  fs.unlinkSync('usa.txt');
}


function writeToFile(filename, data) {
  fs.appendFileSync(filename, data + '\n');
}


fs.createReadStream('input_countries.csv') 
  .pipe(csv())
  .on('data', (data) => {
    if (data.country === 'Canada') {
      writeToFile('canada.txt', `${data.country},${data.year},${data.population}`);
    } else if (data.country === 'United States') {
      writeToFile('usa.txt', `${data.country},${data.year},${data.population}`);
    }
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
  });
