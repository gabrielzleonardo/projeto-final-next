export async function handleFileInput(image: File) {
  if (!image) return;
  const data = new FormData();
  data.append("image", image);
  try {
    const res = await fetch("/api/upload", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .catch((err) => console.error(err));
    return res;
  } catch (e: any) {
    console.error(e);
  }
}
