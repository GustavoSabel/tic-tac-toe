import Ajv from 'ajv';
import {JTDDataType} from 'ajv/dist/core';

const ajv = new Ajv();
const schema = {
  properties: {
    player1: {type: 'string'},
    player2: {type: 'string'},
  },
} as const;
type MyData = JTDDataType<typeof schema>;
const gameValidator = ajv.compile<MyData>(schema);

console.log('created gameValidator');

export default gameValidator;
