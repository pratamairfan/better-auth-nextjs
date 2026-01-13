"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { refresh } from "next/cache";

export const signIn = async (email: string, password: string) => {
  try {
    await auth.api.signInEmail({
      body: {
        email,
        password,
      },
      headers: await headers(),
    });

    refresh();
    return {
      success: true,
      message: "User signed in successfully",
    };
  } catch (error) {
    const e = error as Error;
    return {
      success: false,
      message: e.message || "User signed in failed",
    };
  }
};

export const signUp = async (
  name: string,
  phone: string,
  email: string,
  password: string
) => {
  try {
    await auth.api.signUpEmail({
      body: {
        name,
        phone,
        email,
        password,
      },
      headers: await headers(),
    });
    refresh();
    return {
      success: true,
      message: "User signed up successfully",
    };
  } catch (error) {
    const e = error as Error;
    return {
      success: false,
      message: e.message || "User signed up failed",
    };
  }
};

export const signOut = async () => {
  const result = await auth.api.signOut({ headers: await headers() });
  refresh();
  return {
    success: true,
    message: "User signed out successfully",
    data: result,
  };
};

export const requestPasswordReset = async (email: string) => {
  const result = await auth.api.requestPasswordReset({
    body: {
      email,
      redirectTo: `${
        process.env.NEXT_PUBLIC_APP_URL ||
        process.env.BETTER_AUTH_URL ||
        "http://localhost:3000"
      }/auth/reset-password`,
    },
  });

  return result;
};

export const resetPassword = async (token: string, newPassword: string) => {
  const result = await auth.api.resetPassword({
    body: {
      token,
      newPassword,
    },
  });

  return result;
};
