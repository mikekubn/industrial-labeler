import type { Logger } from '@nestjs/common';
import type { EventEmitter2 } from '@nestjs/event-emitter';
import type { PrismaClient } from '../../generated/prisma/client';
import { expo } from '@better-auth/expo';

import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { admin, openAPI, username } from 'better-auth/plugins';
import { extractEnvVariableToBoolean } from './env';
import { ENABLED_ORIGINS } from './origins';

const getAuth = ({
  eventEmitter,
  logger,
  prisma,
}: {
  eventEmitter: EventEmitter2;
  logger: Logger;
  prisma: PrismaClient;
}) =>
  betterAuth({
    url: process.env.BETTER_AUTH_URL,
    secret: process.env.BETTER_AUTH_SECRET,
    basePath: '/api/v1/auth',
    experimental: { joins: true },
    database: prismaAdapter(prisma, {
      provider: 'postgresql',
    }),
    session: {
      expiresIn: 60 * 60 * 24 * 7,
      updateAge: 60 * 60 * 24,
    },
    emailAndPassword: {
      enabled: true,
      sendResetPassword: async ({ user, url, token }) => {
        /**
         * The event is custom implemented in the InternalService
         * This is workaround to get the token for the user in the frontend
         * without implemntation mail sender.
         */
        await eventEmitter.emitAsync('user.password.reset', {
          email: user.email,
          url,
          token,
        });
        logger.log(`Requested reset password for user: ${user.email}`);
      },
      onPasswordReset: ({ user }) => {
        logger.log(`Password reset for user: ${user.email}`);
        return Promise.resolve();
      },
      disableSignUp: extractEnvVariableToBoolean(
        'BETTER_AUTH_DISABLE_SIGNUP',
        process.env.BETTER_AUTH_DISABLE_SIGNUP,
      ),
    },
    advanced: {
      crossSubDomainCookies: {
        enabled: true,
        domain: 'example.com',
      },
    },
    defaultCookieAttributes: {
      httpOnly: true,
      secure: true,
    },
    trustedOrigins: ENABLED_ORIGINS,
    plugins: [
      expo(),
      username(),
      admin(),
      openAPI({
        disableDefaultReference: true,
      }),
    ],
    logger: {
      disabled: false,
      level: 'info',
      log: (level, message, ...args) => {
        console.log(
          `Better auth [${level}] ${message}`,
          `metadata: ${JSON.stringify(args)}`,
          `timestamp: ${new Date().toISOString()}`,
        );
      },
    },
  });

export { getAuth };
