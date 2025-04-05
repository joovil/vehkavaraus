"use client";

import { verifyUserService } from "@/lib/services/verification/verifyUserService";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const VerificationId = ({ params }: { params: Promise<{ id: string }> }) => {
  const [message, setMessage] = useState<string>("");
  const { data: session, update } = useSession();
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;

    const updateUser = async () => {
      const { id } = await params;

      const res = await verifyUserService(id);

      if (res.status === 200) {
        setMessage("Account verified");
        if (!session) {
          setTimeout(() => {
            if (isMounted.current) {
              redirect("/login");
            }
          }, 5000);
        } else {
          await update({
            user: {
              ...session?.user,
              role: "user",
            },
          });

          setTimeout(() => {
            if (isMounted.current) {
              redirect("/games");
            }
          }, 5000);
        }
      } else {
        setMessage("Key expired or invalid");
        setTimeout(() => {
          if (isMounted.current) {
            redirect("/games");
          }
        }, 5000);
      }
    };

    updateUser();

    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <div className="text-center">
      <h2>{message || "Validating..."}</h2>
    </div>
  );
};

export default VerificationId;
