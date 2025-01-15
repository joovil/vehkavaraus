"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const SignupVerification = () => {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    const f = async () => {
      if (session) {
        signOut();
      }
      await new Promise((resolve) => setTimeout(resolve, 2000));
      router.push("/login");
    };
    f();
  }, [router, session]);

  return (
    <div className="text-center">
      <h2 className="mb-2 text-3xl">Account verified</h2>
      <span className="text-2xl">Redirecting to login</span>
    </div>
  );
};

export default SignupVerification;
