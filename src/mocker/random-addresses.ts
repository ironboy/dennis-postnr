import data from './data.brotli?inline';
import brotliPromise from 'brotli-wasm';
const brotli = await brotliPromise;

let a = brotli.decompress(data);

console.log(a)

/*const { addresses, firstNamesMale, firstNamesFemale, lastNames } = JSON.parse(
  Buffer.from(
    brotli.decompress(data)
    )
  ).toString('utf-8')
);*/
