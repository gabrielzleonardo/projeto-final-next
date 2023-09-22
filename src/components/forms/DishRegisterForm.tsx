"use client";
import { useState, useEffect, use } from "react";
import Image from "next/image";
import { handleFileInput } from "@/utils/file/functions";

const DishRegisterForm = ({ id }: { id?: number }) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageName, setImageName] = useState<string>("");
  const [category, setCategory] = useState<any>("refeicao");
  const [dishName, setDishName] = useState<string>("");
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [newIngredient, setNewIngredient] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [dishData, setDishData] = useState<null>(null);
  const [price, setPrice] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [teste, setTeste] = useState<any>(null);

  // const [blob, setBlob] = useState<any>("");
  // console.log(dishName);

  useEffect(() => {
    if (!imageFile) return;
    // console.log(imageFile);
    const getImageName = async () => {
      const image = await handleFileInput(imageFile);
      setImageName(image);
    };
    getImageName();
  }, [imageFile]);



  // setBlob(URL.createObjectURL(inputFile));

  const handleAddIngredientClick = () => {
    if (!newIngredient) return;
    setIngredients([...ingredients, newIngredient]);
    setNewIngredient("");
  };

  const handleRemoveIngredientClick = (ingredientToBeDeletedIndex: any) => {
    const newIngredientList = ingredients.toSpliced(
      ingredientToBeDeletedIndex,
      1
    );
    setIngredients(newIngredientList);
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch("/api/dishes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: dishName,
          category,
          ingredients,
          price,
          description,
          image: imageName,
        }),
      })
        .then((res) => res.json())
        .catch((err) => console.error(err));
      console.log(res);
    } catch (e: any) {
      console.log("vai pra porra");
    }
  };
  return (
    <div className="">
      <h1 className="my-7 text-3xl">{!id ? "Novo" : "Editar"} prato</h1>
      <form id="form" className="grid gap-y-6">
        <div className="flex flex-col gap-y-4">
          <span className="text-light-400">Imagem do prato</span>
          <label
            htmlFor="fileInput"
            className="px-8 py-3 bg-dark-800 flex items-center justify-between cursor-pointer gap-2 rounded-lg text-light-100 text-sm"
          >
            <div className="flex items-center gap-2">
              <Image
                src="/ui-icons/upload-icon.svg"
                width={24}
                height={25}
                alt="upload icon"
              />
              <span>{imageFile ? imageFile.name : "Selecione uma imagem"}</span>
            </div>
            {imageFile && (
              <button onClick={() => setImageFile(null)}>
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
            )}
          </label>
          <input
            id="fileInput"
            onChange={(e) => {
              if (!e.target.files) return;
              setImageFile(e.target.files[0]);
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
            className="appearance-none bg-chevron-down bg-no-repeat bg-[right_16px_top_50%] !bg-dark-900"
          >
            <option value="refeicao">Refeição</option>
            <option value="prato-principal">Prato principal</option>
            <option value="sobremesa">Sobremesa</option>
          </select>
        </div>
        <div className="flex flex-col gap-y-4 overflow-hidden">
          <label className="text-light-400">Ingredientes</label>
          <div className="rounded-lg px-2 py-3 bg-dark-800 text-light-500 ">
            <div className="flex gap-x-4 overflow-auto">
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
                  className="bg-transparent max-w-[68px] text-light-200 outline-none"
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
        </div>
        <div className="dish-input-wrapper">
          <label>Preço</label>
          <input
            value={price}
            type="number"
            placeholder="R$ 00,00"
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="dish-input-wrapper">
          <label>Descrição</label>
          <textarea
            value={description}
            placeholder="Fale brevemente sobre o prato, seus ingredientes e composição"
            className="resize-none min-h-[172px] p-4"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <button type="button" onClick={handleSubmit}>
          enviar
        </button>
      </form>
    </div>
  );
};

export default DishRegisterForm;
