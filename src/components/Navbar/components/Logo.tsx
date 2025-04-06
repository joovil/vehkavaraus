"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  const { data: session } = useSession();

  const isAdmin = session?.user.role === "admin";

  const href = isAdmin
    ? "/admin/admin-panel"
    : session
      ? `/user/${session?.user.username}`
      : "/games";

  const src = isAdmin
    ? "/icons/admin_horizontal_pink.svg"
    : "/icons/vehka_horizontal_pink.svg";

  return (
    <Link
      href={href}
      className="hidden sm:block"
    >
      <div className="flex-center flex">
        <Image
          src={src}
          priority={true}
          height={0}
          width={0}
          alt="Pink vehka logo"
          className="mr-3 h-auto w-32"
        />
      </div>
    </Link>
  );
};

export default Logo;
