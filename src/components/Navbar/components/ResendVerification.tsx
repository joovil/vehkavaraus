"use client";

import apiFetch from "@/lib/utils/apiFetch";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

const ResendVerification = () => {
  const { data: session } = useSession();
  const pathname = usePathname();

  const handleResend = async () => {
    await apiFetch("/auth/verification/newVerification", {
      method: "POST",
    });
  };

  if (session?.user.role !== "unverified" || pathname == "/signup/verification")
    return;

  return (
    <div className="flex w-full justify-center">
      <button onClick={handleResend}>Resend verification</button>
    </div>
  );
};

export default ResendVerification;
