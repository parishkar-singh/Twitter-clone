import bcrypt from 'bcrypt';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import {PrismaAdapter} from '@next-auth/prisma-adapter';
import prisma from '../../../libs/prismadb';

export default NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: {label: "Email", type: "text", placeholder: "parishkar"},
                password: {label: "Password", type: "password", placeholder: "********"}
            },
            async authorize(credentials, req) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Please enter an email and password!');
                }
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                });
                if (!user || !user?.hashedPassword) {
                    throw new Error('No user found!');
                }
                const isValid = await bcrypt.compare(credentials.password, user.hashedPassword);
                if (!isValid) {
                    throw new Error('Password is incorrect!');
                }
                return user;
            }
        })
    ],
    debug: process.env.NODE_ENV === 'development',
    session: {
        strategy: 'jwt',
    },
    jwt: {
        secret: process.env.NEXTAUTH_JWT_SECRET,
    },
    secret: process.env.NEXTAUTH_SECRET,
});
