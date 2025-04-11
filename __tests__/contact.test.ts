// __tests__/contact.test.ts

import { contactSchema } from '@/lib/validation/contact';

describe('Contact Form Validation', () => {
  it('passes with valid input', () => {
    const validData = {
      name: 'Mustafa',
      email: 'mustafa@example.com',
      subject: 'Hello',
      message: 'This is a test message.',
      reason: 'General Inquiry',
      token: '',
      userAgent: 'test-agent',
    };

    expect(() => contactSchema.parse(validData)).not.toThrow();
  });

  it('fails when required fields are missing', () => {
    const invalidData = {
      name: '',
      email: 'not-an-email',
      subject: '',
      message: '',
      reason: 'General Inquiry',
    };

    expect(() => contactSchema.parse(invalidData)).toThrow();
  });

  it('requires a valid email address', () => {
    const data = {
      name: 'Mustafa',
      email: 'invalid-email',
      subject: 'Test',
      message: 'Hi',
      reason: 'Collaboration',
    };

    expect(() => contactSchema.parse(data)).toThrow(/Invalid email format/);
  });
});
