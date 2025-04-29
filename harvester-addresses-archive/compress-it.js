import brotli from 'brotli';
import fs from 'fs';
import path from 'path';
const d = import.meta.dirname;
const n = path.join(d, '..', 'namn-fran-scb-2022', 'cleaned');

let all = {};
all.addresses = JSON.parse(fs.readFileSync(path.join(d, '/all-saved.json'), 'utf-8'));
all.firstNamesMale = JSON.parse(fs.readFileSync(path.join(n, 'firstNamesMale.json'), 'utf-8'));
all.firstNamesFemale = JSON.parse(fs.readFileSync(path.join(n, 'firstNamesFemale.json'), 'utf-8'));
all.lastNames = JSON.parse(fs.readFileSync(path.join(n, 'lastNames.json'), 'utf-8'));

// Last minute clean
all.addresses = all.addresses.filter(x => !x.includes('null,') && !x.startsWith('null'));

all = JSON.stringify(all);
let tempPath = path.join(d, 'all-data.json');

fs.writeFileSync(tempPath, all, 'utf-8');

let compressed = brotli.compress(fs.readFileSync(tempPath), {
  mode: 1,
  quality: 11
});

fs.writeFileSync(path.join(d, '..', 'data.brotli'), compressed);