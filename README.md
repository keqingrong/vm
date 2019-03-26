# ya-vm

[![npm version](https://img.shields.io/npm/v/ya-vm.svg)](https://www.npmjs.com/package/ya-vm)

> Yet another utility like Node's vm module for browsers

Live demo available at [here](https://keqingrong.github.io/ya-vm/example/).

## Installation

```sh
$ npm install ya-vm
```

The CDN build is also available on unpkg:

- [unpkg.com/ya-vm/dist/ya-vm.umd.js](https://unpkg.com/ya-vm/dist/tiny-save-as.umd.js)
- [unpkg.com/ya-vm/dist/ya-vm.umd.min.js](https://unpkg.com/ya-vm/dist/ya-vm.umd.min.js)

## Usage

```js
import { runInNewContext } from 'ya-vm';

const sandbox = {
  x: 2
};

runInNewContext('function add(a) { return a+x; }; add(42);', sandbox).then((result) => {
  console.log(result); // 44
}, (error) => {
  console.error(error);
});
```

## License

MIT
