"use client";
import { useState, useEffect, use } from "react";
import Image from "next/image";
import { handleFileInput } from "@/utils/file/functions";
import { TagsInput } from "@mantine/core";

const DishRegisterForm = ({ data }: { data?: any }) => {
  const [form, setForm] = useState<any>({
    dishName: "",
    category: "",
    ingredients: [],
    price: "",
    description: "",
    image: "",
  });
  useEffect(() => {
    if (data) {
      setForm(data);
    }
  }, [data]);
  
  const { dishName, category, ingredients, price, description, image } = form;
  console.log(ingredients);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
  };

  const uploadDishImage = async (image: any) => {
    const imagename = await handleFileInput(image);
    setForm({ ...form, image: imagename });
  };

  // const fieldsAreFilled =
  //   !dishName ||
  //   !category ||
  //   !ingredients ||
  //   !price ||
  //   !description ||
  //   !imageFile
  //     ? false
  //     : true;

  // const handleAddIngredientClick = () => {
  //   if (!newIngredient) return;
  //   setIngredients([...ingredients, newIngredient]);
  //   setNewIngredient("");
  // };

  // const handleRemoveIngredientClick = (ingredientToBeDeletedIndex: any) => {
  //   setIngredients(
  //     ingredients.filter((ingredient, i) => i !== ingredientToBeDeletedIndex)
  //   );
  // };

  const handleSubmit = async () => {
    try {
      const res = await fetch("/api/dishes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify({
        //   name: dishName,
        //   category,
        //   ingredients,
        //   price,
        //   description,
        //   image: imageName,
        // }),
      })
        .then((res) => res.json())
        .catch((err) => console.error(err));
      console.log(res);
    } catch (e: any) {
      console.error(e);
    }
  };

  return (
    <div>
      <h1 className="my-7 text-3xl">{!data?.id ? "Novo" : "Editar"} prato</h1>
      <form id="form" className="grid gap-y-6 lg:grid-cols-9 lg:gap-8">
        <div className="flex flex-col gap-y-4 lg:col-span-2">
          <span className="text-light-400">Imagem do prato</span>
          <label
            htmlFor="fileInput"
            className="px-8 py-4 bg-dark-800 flex items-center justify-between cursor-pointer gap-2 rounded-lg text-light-100 text-sm"
          >
            <div className="flex items-center gap-2">
              <Image
                src="/ui-icons/upload-icon.svg"
                width={24}
                height={25}
                alt="upload icon"
              />
              <span>{image ? image : "Selecione uma imagem"}</span>
            </div>
            {image && (
              <button onClick={() => setForm({ ...form })}>
                <svg
                  xmlns="http:www.w3.org/2000/svg"
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
            name="image"
            id="fileInput"
            onChange={(e) => uploadDishImage(e.target.files![0])}
            accept=".jpg, .png, .gif, .jpeg"
            type="file"
            className="sr-only"
          />
        </div>
        <div className="dish-input-wrapper lg:col-span-4">
          <label>Nome</label>
          <input
            name="dishName"
            type="text"
            placeholder="Ex.: Salada Ceasar"
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div className="dish-input-wrapper lg:col-span-3">
          <label>Categoria</label>
          <select
            name="category"
            value={category}
            onChange={(e) => handleInputChange(e)}
            className="appearance-none bg-chevron-down bg-no-repeat bg-[right_16px_top_50%] !bg-dark-900"
          >
            <option value="refeicao">Refeição</option>
            <option value="prato-principal">Prato principal</option>
            <option value="sobremesa">Sobremesa</option>
          </select>
        </div>
        <div className="flex flex-col gap-y-4 overflow-hidden lg:col-span-7">
          <label className="text-light-400">Ingredientes</label>
          <div className="rounded-lg px-2 py-3 bg-dark-800 text-light-500 !text-sm">
            <TagsInput
              name="ingredients"
              placeholder="Adicionar"
              onChange={(e) => setForm({ ...form, ingredients: e })}
              styles={{
      
              }}
            />
          </div>
        </div>
        <div className="dish-input-wrapper lg:col-span-2">
          <label>Preço</label>
          <input
            name="price"
            value={price}
            type="number"
            placeholder="R$ 00,00"
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div className="dish-input-wrapper lg:col-span-full">
          <label>Descrição</label>
          <textarea
            name="description"
            value={description}
            placeholder="Fale brevemente sobre o prato, seus ingredientes e composição"
            className="resize-none min-h-[172px] p-4 "
            onChange={(e) => handleInputChange(e)}
          />
        </div>
      </form>
      <button
        // disabled={id ? false : !fieldsAreFilled}
        className="btn btn-primary lg:w-fit px-6 py-4 lg:ml-auto lg:block lg:mt-8 mt-6"
        type="button"
        onClick={handleSubmit}
      >
        Salvar alterações
      </button>
    </div>
  );
};

export default DishRegisterForm;
