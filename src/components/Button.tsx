"use client";
import { signOut, signIn } from "next-auth/react";
import Link from "next/link";

const Button = () => {
  return (
    <div>
      <Link
      href="/login"
        className="bg-white text-red-600 "
        onClick={() => {
          signOut();
          
        }}
      >
        logout
      </Link>
    </div>
  );
};

export default Button;
