"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const Upload = () => {
  const [imageFile, setImageFile] = useState<any>([]);
  // const [blob, setBlob] = useState<any>("");

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
    <div className="container">
      <Link href="/" className="text-link text-base text-light-300">
        Voltar
      </Link>
      <h1>Novo prato</h1>
      <form className="">
        <fieldset>
          <legend>Imagem do prato</legend>
          <label
            htmlFor="fileInput"
            className="px-8 py-3 bg-dark-800 flex items-center cursor-pointer gap-2 rounded-lg text-light-100"
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
        </fieldset>
        <button type="button" onClick={handleSubmit}>
          enviar
        </button>
      </form>
    </div>
  );
};

export default Upload;
