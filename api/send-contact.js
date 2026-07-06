import { Resend } from "resend";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ success: false, error: "Method not allowed" });
    return;
  }

  const { name, email, subject, message } = req.body ?? {};

  if (!name || !email || !subject || !message) {
    res.status(400).json({ success: false, error: "Missing required fields" });
    return;
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: "FORMAX Website <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL,
      subject: `New contact form submission: ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("send-contact error:", error);
    res.status(500).json({ success: false, error: "Failed to send message" });
  }
}
