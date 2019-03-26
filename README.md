# @keqingrong/vm

[![npm version](https://img.shields.io/npm/v/@keqingrong/vm.svg)](https://www.npmjs.com/package/@keqingrong/vm)

> A JavaScript utility like Node's vm module for browsers

Live demo available at [here](https://keqingrong.github.io/vm/example/).

## Installation

```sh
$ npm install @keqingrong/vm
```

The CDN build is also available on unpkg:

- [unpkg.com/@keqingrong/vm/dist/vm.umd.js](https://unpkg.com/@keqingrong/vm/dist/vm.umd.js)
- [unpkg.com/@keqingrong/vm/dist/vm.umd.min.js](https://unpkg.com/@keqingrong/vm/dist/vm.umd.min.js)

## Usage

```js
import { runInNewContext } from '@keqingrong/vm';

const sandbox = {
  x: 2
};
const code = 'function add(a) { return a+x; }; add(42);';
runInNewContext(code, sandbox).then((result) => {
  console.log(result); // 44
}, (error) => {
  console.error(error);
});
```

## License

MIT
