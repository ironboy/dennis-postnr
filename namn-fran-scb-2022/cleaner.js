import fs from 'fs';

let firstNamesMale = cleanNamesAndConvertToJson(fs.readFileSync('./Tilltalsnamn män-Tabell 1.csv', 'utf-8'));
let firstNamesFemale = cleanNamesAndConvertToJson(fs.readFileSync('./Tilltalsnamn kvinnor-Tabell 1.csv', 'utf-8'));
let lastNames = cleanNamesAndConvertToJson(fs.readFileSync('./Efternamn-Tabell 1.csv', 'utf-8'), false);

console.log(firstNamesMale.length, firstNamesMale.slice(-100));
console.log(firstNamesFemale.length, firstNamesFemale.slice(-100));
console.log(lastNames.length, lastNames.slice(-100));
fs.writeFileSync('./cleaned/firstNamesMale.json', JSON.stringify(firstNamesMale, null, ' '), 'utf-8');
fs.writeFileSync('./cleaned/firstNamesFemale.json', JSON.stringify(firstNamesFemale, null, ' '), 'utf-8');
fs.writeFileSync('./cleaned/lastNames.json', JSON.stringify(lastNames, null, ' '), 'utf-8');


function cleanNamesAndConvertToJson(csv, includeAverageAge = true) {
  let result = csv.split('\n').map(x => {
    let [name, numberOfBearers, averageAge] = x.split(';');
    name = name.toLowerCase().replace(/^./, x => x.toUpperCase()).replace(/-./g, x => x.toUpperCase());
    numberOfBearers = +numberOfBearers.replace(/\s/g, '');
    averageAge = Math.round(+averageAge.replace(/\s/g, '').replace(/,/g, '.'));
    return { name, numberOfBearers, averageAge };
  })
    .filter(x =>
      x.name && x.name != 'Tilltalsnamn'
      && x.name !== 'Efternamn'
      && x.name.length >= 2
      && (x.averageAge !== 0 || !includeAverageAge)
    )
    .sort((a, b) => a.numberOfBearers > b.numberOfBearers ? -1 : 1)
    .slice(0, 10000);
  if (!includeAverageAge) {
    result = result.map(({ name, numberOfBearers }) => ({ name, numberOfBearers }));
  }
  return result;
}