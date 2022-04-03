import { JTDDataType } from 'ajv/dist/core';
import ajvInstance from './ajv.instance';

const newGameSchema = {
  properties: {
    playerOId: { type: 'int32' },
    playerXId: { type: 'int32' },
  },
} as const;
type newGameData = JTDDataType<typeof newGameSchema>;
const newGameValidator = ajvInstance.compile<newGameData>(newGameSchema);

const placeTokenSchema = {
  properties: {
    player: { enum: ['X', 'O'] },
    row: { type: 'int32' },
    col: { type: 'int32' },
  },
} as const;
type placeTokenData = JTDDataType<typeof placeTokenSchema>;
const placeTokenValidator = ajvInstance.compile<placeTokenData>(placeTokenSchema);

export { newGameValidator, placeTokenValidator };
