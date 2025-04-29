import fs from 'fs';
import path from 'path';
let data = JSON.parse(fs.readFileSync(path.join(import.meta.dirname, 'data-uncompressed.json'), 'utf-8'));


data.firstNamesMale = data.firstNamesMale.map(x => Object.values(x));
data.firstNamesFemale = data.firstNamesFemale.map(x => Object.values(x));
data.lastNames = data.lastNames.map(x => Object.values(x));
data.addresses = data.addresses.map((x, i, arr) => {
  if (i > 0) {
    let y = arr[i - 1];
    let co = 1;
    while (x.slice(-co) === y.slice(-co)) { co++; }
    if (-co + 1 === 0) { return x; }
    return x.slice(0, -co + 1) + '*' + co;
  }
  return x;
});
console.log(data);
console.log(JSON.stringify(data).length);
//fs.writeFileSync('compressed.json', JSON.stringify(compressed), 'utf-8');