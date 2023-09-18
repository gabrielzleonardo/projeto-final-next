"use client";
import { useState, useEffect } from "react";

const Upload = () => {
  const [imageFile, setImageFile] = useState<any>([]);
  const [blob, setBlob] = useState<any>("");

  const handleFileInputChange = ({ target }: any) => {
    const inputFile = target.files[0];
    setImageFile(inputFile);
    setBlob(URL.createObjectURL(inputFile));
  };

  const handleUpload = async () => {
    console.log("imageFile", imageFile);
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
    <>
      <div>
        <form>
          <h1>Upload Image</h1>
          <input
            onChange={(e) => {
              handleFileInputChange(e);
            }}
            accept=".jpg, .png, .gif, .jpeg"
            type="file"
          />
          <button type="button" onClick={handleUpload}>
            enviar
          </button>
        </form>
      </div>
    </>
  );
};

export default Upload;
