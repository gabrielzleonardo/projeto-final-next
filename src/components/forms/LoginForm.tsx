"use client";
import {  SyntheticEvent, useState } from "react";
import { signIn } from "next-auth/react";
const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
try {
      await signIn("credentials", {
        email,
        password,
        redirect: true,
        callbackUrl: "/",
      });
} catch (error) {
  alert(error);
}
  };

  return (
    <form
      method="post"
      action="/api/auth/callback/credentials"
      className="grid gap-8 mt-[4.55rem] lg:mt-8 mb-8 text-light-400 lg:w-[350px]"
    >
      <div className="flex flex-col gap-2">
        <label>Email</label>

        <input
          name="username"
          type="text"
          className="text-input lg:border lg:border-light-100 lg:bg-transparent"
          placeholder="Exemplo: exemplo@exemplo.com.br"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label>Senha</label>
        <input
          name="password"
          type="password"
          className="text-input lg:border lg:border-light-100 lg:bg-transparent"
          placeholder="No mínimo 6 caracteres"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="button" onClick={handleSubmit} className="btn btn-primary">
        Entrar
      </button>
    </form>
  );
};

export default LoginForm;
