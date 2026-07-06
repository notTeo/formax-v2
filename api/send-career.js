import { Resend } from "resend";
import { IncomingForm } from "formidable";
import { readFile } from "fs/promises";

export const config = {
  api: {
    bodyParser: false,
  },
};

function parseForm(req) {
  return new Promise((resolve, reject) => {
    const form = new IncomingForm({ multiples: false });
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ success: false, error: "Method not allowed" });
    return;
  }

  try {
    const { fields, files } = await parseForm(req);

    const name = fields.name?.[0] ?? fields.name;
    const email = fields.email?.[0] ?? fields.email;
    const position = fields.position?.[0] ?? fields.position;
    const message = fields.message?.[0] ?? fields.message;
    const cv = files.cv?.[0] ?? files.cv;

    if (!name || !email || !position || !message) {
      res.status(400).json({ success: false, error: "Missing required fields" });
      return;
    }

    const attachments = [];
    if (cv) {
      const content = await readFile(cv.filepath);
      attachments.push({
        filename: cv.originalFilename,
        content,
      });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: "FORMAX Website <onboarding@resend.dev>",
      to: process.env.CAREER_EMAIL,
      subject: `New career application: ${position}`,
      text: `Name: ${name}\nEmail: ${email}\nPosition: ${position}\n\n${message}`,
      attachments,
    });

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
