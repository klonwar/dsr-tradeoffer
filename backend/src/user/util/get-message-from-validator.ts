import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

export const getMessageFromValidator = async (cls, plain): Promise<string> => {
  const validationErrors = await validate(plainToClass(cls, plain));

  if (validationErrors.length === 0) return null;

  // Достанем сообщения об ошибке из class-validator-а
  return validationErrors
    .map((item) => Object.values(item.constraints).join(`, `))
    .join(`; `);
};
