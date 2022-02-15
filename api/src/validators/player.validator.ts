import { JTDDataType } from 'ajv/dist/core';
import ajv from './ajv.instance';

const schema = {
  properties: {
    name: { type: 'string' },
  },
} as const;
type Data = JTDDataType<typeof schema>;
const newPlayerValidator = ajv.compile<Data>(schema);

export { newPlayerValidator };
