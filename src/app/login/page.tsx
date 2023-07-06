
import Image from "next/image";
import logo from "/public/logo.svg";
import Link from "next/link";
import LoginForm from "@/components/LoginForm";

export default function SignIn() {
  return (
    <div className="grid lg:grid-flow-col place-content-center pl-4 lg:justify-between h-screen container lg:px-24">
      <div className="flex gap-3 items-center justify-center lg:ml-10">
        <Image src={logo} alt="icone food explorer" width={43} height={43} />
        <span className="text-light-100 font-bold text-4xl lg:text-5xl">
          food explorer
        </span>
      </div>
      <div className="lg:bg-dark-700 lg:p-16 lg:rounded-2xl lg:place-self-center grid">
        <h1 className="text-light-100 font-poppins font-medium text-3xl text-center hidden lg:block">
          Faça login
        </h1>
        <LoginForm/>
        <Link href="/register" className="text-link">
          Criar uma conta
        </Link>
      </div>
    </div>
  );
}


