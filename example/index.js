import { runInNewContext, runInNewIframe, runInNewWorker } from '../src/index.js';

const sandbox = {
  x: 2,
  y: 4,
  z: 8
};

runInNewIframe('x += 1', sandbox).then((result) => {
  console.log('x += 1', result);
}, (error) => {
  console.log('x += 1', error);
});

runInNewWorker('y += 1', sandbox).then((result) => {
  console.log('y += 1', result);
}, (error) => {
  console.log('y += 1', error);
});

runInNewContext('z += 1', sandbox).then((result) => {
  console.log('z += 1', result);
}, (error) => {
  console.log('z += 1', error);
});

runInNewContext('function add(a) { return a+x; }; add(42);', sandbox).then((result) => {
  console.log(result);
}, (error) => {
  console.error(error);
});
