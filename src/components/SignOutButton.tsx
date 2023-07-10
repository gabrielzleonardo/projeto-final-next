"use client";
import { signOut, signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const SignOutButton = () => {
  return (

      <Link
        href="/login"
        className="items-center max-w-fit hidden lg:flex"
        onClick={() => {
          signOut();
        }}
      >
        <Image
          src="/ui-icons/signOut-icon.svg"
          width={32}
          height={32}
          alt="sair"
        />
      </Link>

  );
};

export default SignOutButton;
