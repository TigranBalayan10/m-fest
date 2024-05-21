import { z } from 'zod';

export const phoneNumberSchema = z.preprocess(
  (value) => {
    if (typeof value !== 'string') {
      throw new z.ZodError([
        {
          code: 'invalid_type',
          expected: 'string',
          received: typeof value,
          path: [],
          message: 'Phone number must be a string',
        },
      ]);
    }

    // Remove any non-digit characters from the phone number
    const sanitizedValue = value.replace(/\D/g, '');

    // Validate the length of the phone number
    if (sanitizedValue.length !== 10) {
      throw new z.ZodError([
        {
          code: 'too_small',
          minimum: 10,
          type: 'string',
          inclusive: true,
          path: [],
          message: 'Phone number must be 10 digits',
        },
      ]);
    }

    // Convert the phone number string to an integer
    return parseInt(sanitizedValue, 10);
  },
  z.number().int().positive(),
);