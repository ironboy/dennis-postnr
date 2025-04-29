import data from './data.gzip?inline';
import pako from 'pako';


let h = pako.inflate(data);
console.log(h);