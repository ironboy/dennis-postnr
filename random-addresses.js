import brotli from 'brotli';
import fs from 'fs';
import path from 'path';

// Read compressed data from file, brotli-decompress,
// convert to buffer, then to string and finally deserialize JSON
const { addresses, firstNamesMale, firstNamesFemale, lastNames } = JSON.parse(
  Buffer.from(
    brotli.decompress(
      fs.readFileSync(path.join(import.meta.dirname, 'data.brotli'))
    )
  ).toString('utf-8')
);

// Shuffle (randomize the order of items in) an array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

// An array in which to store a shuffled copy of the address data
let dataCopy = [];

function randomAddresses(
  howMany = 1,
  includeLabel = false,
  labelOnly = false
) {
  if (dataCopy.length < howMany) {
    while (dataCopy.length < howMany) {
      dataCopy = [...dataCopy, ...addresses];
    }
    shuffleArray(dataCopy);
  }
  let labels = dataCopy.splice(0, howMany);
  return labelOnly ? labels : labels.map((label => {
    let street = (/^[^\d]*/).exec(label)[0].trim();
    let streetNo = label.replace(street + ' ', '').split(',')[0];
    let zipCode = (/(\d|\s)*/).exec(label.split(',')[1])[0].trim();
    let city = label.split(zipCode).slice(1)[0].trim();
    return { ...(includeLabel ? { label } : {}), street, streetNo, zipCode, city };
  }));
}

// tests
console.log(randomAddresses(10));
console.log('');
console.log('');
console.log(randomAddresses(10, true));