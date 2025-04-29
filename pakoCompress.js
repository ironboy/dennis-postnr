import pako from 'pako';
import fs from 'fs';
import path from 'path';
import 'es-arraybuffer-base64/auto';


let data = fs.readFileSync(path.join(import.meta.dirname, 'data-uncompressed.json'), 'utf-8');
data = pako.deflate(data);
data = data.toBase64();

fs.writeFileSync(path.join(import.meta.dirname, 'data.gzip.base64'), data, 'utf-8');