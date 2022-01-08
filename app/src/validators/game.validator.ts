import {JTDDataType} from 'ajv/dist/core';
import ajv from './ajv.instance';

const newGameSchema = {
  properties: {
    player1Id: {type: 'int32'},
    player2Id: {type: 'int32'},
  },
} as const;
type newGameData = JTDDataType<typeof newGameSchema>;
const newGameValidator = ajv.compile<newGameData>(newGameSchema);

const placeTokenSchema = {
  properties: {
    player: {type: 'int32'},
    row: {type: 'int32'},
    col: {type: 'int32'},
  },
} as const;
type placeTokenData = JTDDataType<typeof placeTokenSchema>;
const placeTokenValidator = ajv.compile<placeTokenData>(placeTokenSchema);

export {newGameValidator, placeTokenValidator};
