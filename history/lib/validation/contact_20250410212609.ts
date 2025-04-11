import { z } from 'zod';

// Define the expected request body structure
export const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email format'),
  subject: z.string().min(1, 'Subject is required'),
  reason: z.enum(['General Inquiry', 'Speaking / Media', 'Collaboration', 'Investment / Business']),
  message: z.string().min(1, 'Message is required'),
  _bot: z.string().optional(), // honeypot
  token: z.string().optional(), // Make token optional for testing
  userAgent: z.string().optional(), // For testing
});

// Type for the validated data
export type ContactFormData = z.infer<typeof contactSchema>;
