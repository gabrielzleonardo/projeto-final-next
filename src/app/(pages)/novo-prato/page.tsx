"use client";
import { useState, useEffect, SyntheticEvent } from "react";
import Image from "next/image";
import PreviousPageLink from "@/components/nav/PreviousPageLink";

const Upload = () => {
  const [imageFile, setImageFile] = useState<any>([]);
  const [category, setCategory] = useState<any>("refeicao");
  const [dishName, setDishName] = useState<any>("");
  const [ingredients, setIngredients] = useState<any[]>([]);
  const [newIngredient, setNewIngredient] = useState<any>("");

  // const [blob, setBlob] = useState<any>("");
  // console.log(dishName);

  const handleFileInput = ({ target }: any) => {
    const inputFile = target.files[0];
    setImageFile(inputFile);
    // setBlob(URL.createObjectURL(inputFile));
  };

  const handleAddIngredientClick = () => {
    if (!newIngredient) return;
    setIngredients([...ingredients, newIngredient]);
    setNewIngredient("");
  };

  console.log(ingredients);

  const handleRemoveIngredientClick = (ingredientToBeDeletedIndex: any) => {
    const newIngredientList = ingredients.toSpliced(
      ingredientToBeDeletedIndex,
      1
    );
    setIngredients(newIngredientList);
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
        <div className="flex flex-col gap-y-4">
          <label className="text-light-400">Ingredientes</label>
          <div className="rounded-lg px-2 py-3 bg-dark-800 text-light-500 flex gap-x-4">
            {ingredients.map((ingredient: any, i: number) => (
              <div
                key={`${ingredient}-${i}`}
                className="rounded-lg w-fit py-2 px-4 flex items-center gap-x-2 text-light-100 bg-light-600"
              >
                {ingredient}
                <button
                  type="button"
                  onClick={() => handleRemoveIngredientClick(i)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="8"
                    height="9"
                    viewBox="0 0 8 9"
                    fill="none"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M7.88284 1.04123C8.03905 1.19744 8.03905 1.45071 7.88284 1.60691L0.682843 8.80692C0.526633 8.96313 0.273367 8.96313 0.117157 8.80692C-0.0390524 8.6507 -0.0390524 8.39744 0.117157 8.24123L7.31716 1.04123C7.47337 0.88502 7.72663 0.88502 7.88284 1.04123Z"
                      fill="white"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M0.117157 1.04123C0.273367 0.88502 0.526633 0.88502 0.682843 1.04123L7.88284 8.24123C8.03905 8.39744 8.03905 8.6507 7.88284 8.80692C7.72663 8.96313 7.47337 8.96313 7.31716 8.80692L0.117157 1.60691C-0.0390524 1.45071 -0.0390524 1.19744 0.117157 1.04123Z"
                      fill="white"
                    />
                  </svg>
                </button>
              </div>
            ))}
            <div className="border border-light-500 border-dashed rounded-lg w-fit py-2 px-4 flex gap-x-2">
              <input
                value={newIngredient}
                className="bg-transparent max-w-[68px] text-light-200"
                type="text"
                placeholder="Adicionar"
                onChange={(e) => setNewIngredient(e.target.value)}
              />
              <button type="button" onClick={handleAddIngredientClick}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="8"
                  height="9"
                  viewBox="0 0 8 9"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0 4.92407C0 4.73998 0.149238 4.59074 0.333333 4.59074H7.66667C7.85076 4.59074 8 4.73998 8 4.92407C8 5.10817 7.85076 5.25741 7.66667 5.25741H0.333333C0.149238 5.25741 0 5.10817 0 4.92407Z"
                    fill="#7C7C8A"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4 0.924072C4.18409 0.924072 4.33333 1.07331 4.33333 1.25741V8.59074C4.33333 8.77483 4.18409 8.92407 4 8.92407C3.81591 8.92407 3.66667 8.77483 3.66667 8.59074V1.25741C3.66667 1.07331 3.81591 0.924072 4 0.924072Z"
                    fill="#7C7C8A"
                  />
                </svg>
              </button>
            </div>
          </div>
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
