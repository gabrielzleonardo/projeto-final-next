"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSignUpClick = async () => {
    const request: any = await fetch("/api/users/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        email,
        password,
        name,
      }),
    }).then((res) => res.json());

    if (request.message) {
      alert(request.message);
      return;
    }

    alert("Conta criada com sucesso, faça login para continuar");
    signIn();
  };

  return (
    <>
      <form className="grid gap-8 mt-[4.55rem] lg:mt-8 mb-8 text-light-400 lg:w-[350px]">
        <div className="flex flex-col gap-2">
          <label>Seu nome</label>
          <input
            className="text-input"
            type="text"
            placeholder="Exemplo: Maria Silva"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label>Email</label>
          <input
            className="text-input"
            type="email"
            placeholder="Exemplo: Exemplo@exemplo.com.br"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label>Senha</label>
          <input
            className="text-input"
            type="password"
            placeholder="No mínimo 6 caracteres"
            minLength={6}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="button"
          onClick={handleSignUpClick}
          className="btn btn-primary"
        >
          Criar conta
        </button>
      </form>
      <button onClick={() => signIn()} className="text-link w-full">
        Já tenho uma conta
      </button>
    </>
  );
};

export default RegisterForm;
