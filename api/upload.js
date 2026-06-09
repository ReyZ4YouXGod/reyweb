import fetch from "node-fetch";
import FormData from "form-data";

export const config = {
  api: {
    bodyParser: false
  }
};

export default async function handler(req, res) {
  if(req.method !== "POST"){
    return res.status(405).json({ error: "Method not allowed" });
  }

  const chunks = [];

  req.on("data", chunk => chunks.push(chunk));

  req.on("end", async () => {
    try {
      const buffer = Buffer.concat(chunks);

      const form = new FormData();
      form.append("fileToUpload", buffer, "file");
      form.append("reqtype", "fileupload");

      const response = await fetch("https://catbox.moe/user/api.php", {
        method: "POST",
        body: form
      });

      const link = await response.text();

      res.status(200).json({ link });

    } catch (e) {
      res.status(500).json({ error: "upload gagal" });
    }
  });
}
