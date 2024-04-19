import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import z from 'zod';
import { sql } from '@vercel/postgres';
import type { User } from '@/app/lib/definitions';
import bcrypt from 'bcrypt';

async function getUser(email: string): Promise<User | undefined> {
  try {
    const users = await sql<User>`SELECT * FROM users WHERE email=${email}`;
    return users.rows[0];
  } catch (error) {
    console.log('🚀 ~ failed to fetch user:', error);
    throw new Error('Failed to get user');
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCrendentials = z
          .object({
            email: z.string().email(),
            password: z.string().min(6),
          })
          .safeParse(credentials);

        if (parsedCrendentials.success) {
          const { email, password } = parsedCrendentials.data;
          const user = await getUser(email);
          if (!user) return null;
          const isPasswordMatch = await bcrypt.compare(password, user.password);

          if (isPasswordMatch) return user;
        }
        return null;
      },
    }),
  ],
});
