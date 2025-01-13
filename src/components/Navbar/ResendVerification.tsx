"use client";

import apiFetch from "@/lib/utils/apiFetch";
import { useSession } from "next-auth/react";

const ResendVerification = () => {
  const { data: session, update } = useSession();

  const handleResend = async () => {
    // Add your resend verification logic here
    const res = await apiFetch("/auth/verification/newVerification", {
      method: "POST",
    });
    const data = await res.json();

    if (!data.error) update({ role: "user" });
  };

  const testUpdate = async () => {
    if (!session) return;
    console.log(session.user.role);

    const res = await update({ role: "user" });
    console.log("res", res);
    console.log(session);
  };

  return (
    <div className="flex w-full justify-center">
      <button onClick={testUpdate}>test</button>
      <button onClick={handleResend}>Resend verification</button>
    </div>
  );
};

export default ResendVerification;
