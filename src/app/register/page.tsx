import Image from "next/image";
import logo from "/public/logo.svg";
const page = () => {
  return (
    <div className="grid place-content-center h-screen">
      <div className="flex gap-3">
        <Image src={logo} alt="icone food explorer" width={43} height={43} />
        <h1 className="text-light-100 font-bold text-4xl">food explorer</h1>
      </div>
      <form>
        <div className="flex flex-col gap-2 text-light-400">
          <label>Seu nome</label>
          <input className="px-[.87rem] py-4 bg-dark-900 rounded-lg" type="text" placeholder="Exemplo: Maria Silva" />
        </div>
      </form>
    </div>
  );
};

export default page;
