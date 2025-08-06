import { LoginIcon } from "@/public/icons/icons";
import { signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";
export default function Logout() {
  return (
    <Link
      href="/auth/login"
      onClick={() => signOut({ callbackUrl: "/auth/login" })}
      className="text-blueGray-700 hover:text-[#0ea5e9] text-[14px] uppercase py-3  flex   gap-2"
    >
      <LoginIcon />
      Logout
    </Link>
  );
}
