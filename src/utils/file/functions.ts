export async function handleFileInput(file: File) {
  if (!file) return;
  const data = new FormData();
  data.append("file", file);
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
