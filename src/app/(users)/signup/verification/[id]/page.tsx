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
    console.log("hello");
    isMounted.current = true;

    const updateUser = async () => {
      try {
        const { id } = await params;

        await verifyUserService(id);
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
      } catch (error) {
        console.error(error);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="text-center">
      <h2>{message || "Validating..."}</h2>
    </div>
  );
};

export default VerificationId;
