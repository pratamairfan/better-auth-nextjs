import { betterAuth } from "better-auth";

import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db/drizzle";
import { nextCookies } from "better-auth/next-js";
import { schema } from "@/db/schema";
import { sendResetPasswordEmail } from "@/lib/email";

export const auth = betterAuth({
  session: {
    expiresIn: 60 * 60,
    updateAge: 60 * 5,
    freshAge: 0,
  },
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url }) => {
      // Send reset password email to user
      // Using void to avoid awaiting (prevents timing attacks)
      void sendResetPasswordEmail(user.email, url);
    },
    resetPasswordTokenExpiresIn: 3600, // 1 hour in seconds
    onPasswordReset: async ({ user }) => {
      // Log password reset for security/analytics
      console.log(`✅ Password reset successful for user: ${user.email}`);
    },
  },
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  user: {
    additionalFields: {
      phone: {
        type: "string",
        required: false,
      },
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  plugins: [nextCookies()],
});
