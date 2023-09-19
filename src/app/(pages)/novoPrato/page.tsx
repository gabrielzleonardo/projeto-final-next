"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import PreviousPageLink from "@/components/nav/PreviousPageLink";

const Upload = () => {
  const [imageFile, setImageFile] = useState<any>([]);
  const [category, setCategory] = useState<any>("refeicao");
  const [dishName, setDishName] = useState<any>("");
  const [ingredients, setIngredients] = useState<any>([]);
  // const [blob, setBlob] = useState<any>("");
  // console.log(dishName);

  const handleFileInput = ({ target }: any) => {
    const inputFile = target.files[0];
    setImageFile(inputFile);
    // setBlob(URL.createObjectURL(inputFile));
  };

  const handleSubmit = async () => {
    if (!imageFile) return;
    try {
      const data = new FormData();
      data.append("image", imageFile);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .catch((err) => console.error(err));
      console.log(res);
      if (!res.ok) throw new Error(await res.text());
    } catch (e: any) {
      console.error(e);
    }
  };

  return (
    <div className="container pt-3 pb-14">
      <PreviousPageLink href="/" />
      <h1 className="my-7 text-3xl">Novo prato</h1>
      <form className="grid gap-y-6">
        <div className="flex flex-col gap-y-4">
          <span className="text-light-400">Imagem do prato</span>
          <label
            htmlFor="fileInput"
            className="px-8 py-3 bg-dark-800 flex items-center cursor-pointer gap-2 rounded-lg text-light-100 text-sm"
          >
            <Image
              src="/ui-icons/upload-icon.svg"
              width={24}
              height={25}
              alt="upload icon"
            />
            Selecione a imagem
          </label>
          <input
            id="fileInput"
            onChange={(e) => {
              handleFileInput(e);
            }}
            accept=".jpg, .png, .gif, .jpeg"
            type="file"
            className="sr-only"
          />
        </div>
        <div className="dish-input-wrapper">
          <label>Nome</label>
          <input
            type="text"
            placeholder="Ex.: Salada Ceasar"
            onChange={(e) => setDishName(e.target.value)}
          />
        </div>
        <div className="dish-input-wrapper">
          <label>Categoria</label>
          <select
            name="select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="appearance-none bg-chevron-down bg-no-repeat bg-[right_16px_top_12px] !bg-dark-900"
          >
            <option value="refeicao">Refeição</option>
            <option value="prato-principal">Prato principal</option>
            <option value="sobremesa">Sobremesa</option>
          </select>
        </div>
        <div className="">
          <label>Ingredientes</label>
          <div></div>
        </div>
        <div className="dish-input-wrapper">
          <label>Preço</label>
          <input
            type="number"
            placeholder="40,00"
            onChange={(e) => setDishName(e.target.value)}
          />
        </div>

        <button type="button" onClick={handleSubmit}>
          enviar
        </button>
      </form>
    </div>
  );
};

export default Upload;
