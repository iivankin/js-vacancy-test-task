import { z } from 'zod';

import { EMAIL_REGEX, PASSWORD_REGEX } from 'app-constants';

export const emailSchema = z.string().toLowerCase().regex(EMAIL_REGEX, 'Email format is incorrect.');
export const passwordSchema = z
  .string()
  .regex(
    PASSWORD_REGEX,
    'The password must contain 8 or more characters with at least one lower case (a-z) and capital (A-Z) letter and one number (0-9).',
  );
