import data from './data.gzip.base64?raw';
import pako from 'pako';

let encoder = new TextEncoder();
encoder.encode;


let h = pako.inflate(encoder.encode(atob(data)));