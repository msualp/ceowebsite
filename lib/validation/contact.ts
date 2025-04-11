import { z } from 'zod';

// Define the expected request body structure
export const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'), // The name of the contact, must not be empty
  email: z.string().email(/* t('validation.email') */ 'Invalid email format'), // The email address of the contact, must be a valid email format
  subject: z.string().min(1, 'Subject is required'), // The subject of the inquiry, must not be empty
  reason: z.enum(['General Inquiry', 'Speaking / Media', 'Collaboration', 'Investment / Business']), // The reason for contacting, must be one of the predefined options
  message: z.string().min(1, 'Message is required'), // The message content, must not be empty
  _bot: z.string().optional(), // honeypot, used to detect bots
  token: z.string().optional(), // Make token optional for testing, used for verification
  userAgent: z.string().optional(), // For testing, captures the user's agent information
});

// Type for the validated data
export type ContactFormData = z.infer<typeof contactSchema>;

export function formatZodErrors(error: z.ZodError) {
  return error.flatten().fieldErrors;
}
