import type { Request, Response } from "express"
import nodemailer from "nodemailer"

type ContactFormData = {
  name: string
  email: string
  phone?: string
  okToText?: string
  message: string
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "your-email@gmail.com",
    pass: "your-password",
  },
})

const submitContactForm = async (req: Request, res: Response) => {
  const data: ContactFormData = req.body
  let projectDetails = ""

  if (data.phone) {
    projectDetails += `Phone number: ${data.phone}\n`
  }

  if (data.okToText === "on") {
    projectDetails += `Text messaging: Customer has opted in to receive scheduling links via text\n`
  }

  const mailOptions = {
    from: data.email,
    to: "recipient-email@gmail.com",
    subject: "Contact Form Submission",
    text: `Name: ${data.name}\nEmail: ${data.email}\n\n${projectDetails}\nMessage: ${data.message}`,
    html: `
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      ${data.phone ? `<p><strong>Phone Number:</strong> ${data.phone}</p>` : ""}
      ${data.okToText === "on" ? `<p><strong>Text Messaging:</strong> Customer has opted in to receive scheduling links via text</p>` : ""}
      <p><strong>Message:</strong> ${data.message}</p>
    `,
  }

  try {
    await transporter.sendMail(mailOptions)
    res.status(200).send("Form submitted successfully")
  } catch (error) {
    res.status(500).send("Error submitting form")
  }
}

const processFormSubmission = (formData: any): ContactFormData => {
  return {
    name: (formData.get("name") || "").toString().trim(),
    email: (formData.get("email") || "").toString().trim(),
    phone: (formData.get("phone") || "").toString().trim(),
    okToText: (formData.get("okToText") || "").toString().trim(),
    message: (formData.get("message") || "").toString().trim(),
  }
}

export { submitContactForm, processFormSubmission }
