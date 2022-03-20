import { ErrorObject } from 'ajv';

export class ValidationError extends Error {
  constructor(public validations: ErrorObject[]) {
    super();
  }
}