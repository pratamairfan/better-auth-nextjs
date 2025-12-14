"use server";
import { auth } from "@/lib/auth";

export const signIn = async () => {
  await auth.api.signInEmail({
    body: {
      email: "user@email.com",
      password: "password",
    },
  });
};

export const signUp = async () => {
  await auth.api.signUpEmail({
    body: {
      email: "user@email.com",
      password: "password",
      name: "user",
      phone: "1234567890",
    },
  });
};

export const signOut = async () => {
  await auth.api.signOut();
};
