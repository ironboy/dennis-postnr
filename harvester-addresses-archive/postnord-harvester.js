import fs from 'fs';
import path from 'path';

let postnr = fs.readFileSync(path.join(import.meta.dirname, 'postnr.csv'), 'utf-8').split('\n').map(x => x.slice(0, 5));

let co = 1;
for (let apostnr of postnr) {
  console.log(co++);
  //if (!'34567'.includes(apostnr[3])) { continue; }
  if (+apostnr < 11130) { continue; }
  let data = await (await fetch('https://www.postnord.se/api/location/get-by-location?countryCode=SE&query=' + apostnr)).json();
  let lastStreet;
  for (let address of data.addresses) {
    if (address.label.startsWith('BOX')) { continue; }
    if (address.label.split(',').length < 3) { continue; }
    let { street, houseNumber, city } = address;
    let pnr = apostnr.slice(0, 3) + ' ' + apostnr.slice(3);
    if (lastStreet === street) { continue; }
    fs.appendFileSync(path.join(import.meta.dirname, 'all.txt'), '"' + street + ' ' + houseNumber + ', ' + pnr + ' ' + city + '",\n', 'utf-8');
    lastStreet = street;
  }

}
