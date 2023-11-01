import { registerAs } from '@nestjs/config';

export default registerAs('scents', () => ({
  // 👈
  foo: 'bar', // 👈
}));
