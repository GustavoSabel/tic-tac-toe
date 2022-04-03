import { JTDDataType } from 'ajv/dist/core';
import ajvInstance from './ajv.instance';

const schema = {
  properties: {
    name: { type: 'string' },
  },
} as const;
type Data = JTDDataType<typeof schema>;
const newPlayerValidator = ajvInstance.compile<Data>(schema);

export { newPlayerValidator };
