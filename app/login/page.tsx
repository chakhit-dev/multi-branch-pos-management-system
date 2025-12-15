'use client'

import { LoginForm } from "@/components/login/login-form";
import { SessionProvider, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  return (
    <SessionProvider>
      <AuthContent />
    </SessionProvider>
  );
}

// Separate component to use useSession
function AuthContent() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // console.log(session)

  useEffect(() => {
    if (status === "authenticated" && session) {
      if (session.user.role === "admin") {
        router.push(`/shop/${session.user.atb}`);
      } else if (session.user.role === "owner") {
        router.push(`/owner`);
      } else {
        router.push(`/shop/${session.user.atb}`);
      }
    }
  }, [status, session, router]);


  if (status === "loading") {
    return (
      <div className="flex min-h-screen w-full items-center justify-center p-6 md:p-10">
        Loading...
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <LoginForm />
        </div>
      </div>
    );
  }

  return null;
}
