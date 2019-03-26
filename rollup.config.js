import {
  author,
  name as fullName,
  version
} from './package.json';

const name = fullName.split('/').pop();
const banner = `/* @license ${name} v${version} | (c) ${author} */`;

const config = {
  input: 'src/index.js',
  output: [{
      file: `dist/${name}.esm.js`,
      format: 'es',
      banner: banner
    },
    {
      file: `dist/${name}.umd.js`,
      name: 'VM',
      format: 'umd',
      banner: banner
    }
  ]
};

export default config;
