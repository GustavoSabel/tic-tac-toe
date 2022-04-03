import Ajv from 'ajv/dist/jtd';

const ajvInstance = new Ajv({
  removeAdditional: true,
});

export default ajvInstance;
