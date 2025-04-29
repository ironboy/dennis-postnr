import pako from 'pako';
import fs from 'fs';
import path from 'path';


let data = fs.readFileSync(path.join(import.meta.dirname, 'data-uncompressed.json'), 'utf-8');
data = pako.deflate(data);

fs.writeFileSync(path.join(import.meta.dirname, 'data.gzip'), data);