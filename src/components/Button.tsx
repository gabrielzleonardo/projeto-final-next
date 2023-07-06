"use client";
import { signOut } from "next-auth/react";

const Button = () => {
  return (
    <div>
      <button className="bg-white text-red-600 " onClick={() => signOut()}>
        logout
      </button>
    </div>
  );
};

export default Button;
