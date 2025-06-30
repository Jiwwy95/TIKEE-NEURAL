import { JwtModule } from '@nestjs/jwt';

export const JwtProvider = JwtModule.register({
  secret: process.env.JWT_SECRET || 'default_secret',
  signOptions: { expiresIn: '1h' },
});
