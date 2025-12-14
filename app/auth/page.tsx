import { RadioIcon } from "lucide-react";

import { SigninForm } from "@/components/signin-form";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SignupForm } from "@/components/signup-form";
import { signIn, signUp } from "@/server/user";

export default function AuthPage() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get callback URL from search params (set by middleware)

  const handleSocialAuth = async (provider: "google" | "github") => {
    setIsLoading(true);
    setError("");

    //     try {
    //       await signInSocial(provider);
    //     } catch (err) {
    //       setError(
    //         `Error authenticating with ${provider}: ${
    //           err instanceof Error ? err.message : "Unknown error"
    //         }`
    //       );
    //     } finally {
    //       setIsLoading(false);
    //     }
    //   };

    const handleEmailAuth = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);
      setError("");

      try {
        if (isSignIn) {
          const result = await signIn(email, password);
          if (!result.user) {
            setError("Invalid email or password");
          } else {
            const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
            router.push(callbackUrl);
          }
        } else {
          const result = await signUp(email, password, name, phone);
          if (!result.user) {
            setError("Failed to create account");
          } else {
            const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
            router.push(callbackUrl);
          }
        }
      } catch (err) {
        setError(
          `Authentication error: ${
            err instanceof Error ? err.message : "Unknown error"
          }`
        );
      } finally {
        setIsLoading(false);
      }
    };
    return (
      <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
        <div className="flex w-full max-w-sm flex-col gap-6">
          <a
            href="#"
            className="flex items-center gap-2 self-center font-medium"
          >
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <RadioIcon className="size-4" />
            </div>
            My SiTO
          </a>
          {/* {!isSignIn && <SignupForm />} */}
          <SigninForm />
        </div>
      </div>
    );
  };
}
