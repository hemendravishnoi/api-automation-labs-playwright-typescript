import {Ajv} from 'ajv';

const ajv = new Ajv({ allErrors: true });

export function validateSchema(schema: object, data: unknown): boolean {
  const validate = ajv.compile(schema);
  return validate(data) as boolean;
}