import { ValidationError } from '@src/core/errors/ValidationError'
import { ValidateFunction } from 'ajv'

export default function validate<T>(validator: ValidateFunction<T>, body: any) {
  if (!validator(body)) {
    throw new ValidationError(validator.errors!)
  }
  return body as T;
}