import fs from 'fs';
import path from 'path';
import nodeGzip from 'node-gzip';
const { gzip, ungzip } = nodeGzip;

let data = fs.readFileSync(path.join(import.meta.dirname, 'data-uncompressed.json'), 'utf-8');
data = await gzip(data, { level: 9 });

fs.writeFileSync(path.join(import.meta.dirname, 'data.gzip'), data, 'utf-8');