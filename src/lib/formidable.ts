import { IncomingForm } from "formidable";

export async function getImage(formData: any) {
  const data: any = await new Promise(function (resolve, reject) {
    const form = new IncomingForm({ keepExtensions: true });
    form.parse(formData, function (err, fields, files) {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });

  return data.files.image;
}
