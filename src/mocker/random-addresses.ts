import data from './data.gzip?inline';
import pako from 'pako';

console.log(data);

let h = pako.inflate(data);
console.log(h);