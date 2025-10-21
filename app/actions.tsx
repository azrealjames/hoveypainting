"use server"
import nodemailer from "nodemailer"

type ContactFormData = {
  name: string
  email: string
  phone: string
  service: string
  message: string
}

export async function submitContactForm(data: ContactFormData) {
  try {
    // Create a transporter using the environment variables
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST,
      port: Number(process.env.EMAIL_SERVER_PORT),
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
      secure: Number(process.env.EMAIL_SERVER_PORT) === 465, // true for 465, false for other ports like 587
    })

    // Format the service name to be more readable
    const serviceMap: Record<string, string> = {
      interior: "Interior Painting",
      exterior: "Exterior Painting",
      commercial: "Commercial Painting",
      cabinet: "Cabinet Refinishing",
      deck: "Deck & Fence Staining",
      consultation: "Color Consultation",
    }

    const serviceName = serviceMap[data.service] || data.service

    // Send the email
    await transporter.sendMail({
      from: `"Hovey Painting Website" <${process.env.EMAIL_SERVER_USER}>`,
      to: "hoveypainting@yahoo.com",
      subject: `New Quote Request from ${data.name}`,
      text: `
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Service: ${serviceName}
Message: ${data.message}
      `,
      html: `
<h2>New Quote Request</h2>
<p><strong>Name:</strong> ${data.name}</p>
<p><strong>Email:</strong> ${data.email}</p>
<p><strong>Phone:</strong> ${data.phone}</p>
<p><strong>Service:</strong> ${serviceName}</p>
<p><strong>Message:</strong></p>
<p>${data.message.replace(/\n/g, "<br>")}</p>
      `,
    })

    // Return success status
    return {
      success: true,
      message: "Thank you! Your request has been submitted. We'll be in touch soon.",
    }
  } catch (error) {
    console.error("Error submitting form:", error)
    return {
      success: false,
      error: "Failed to submit form. Please try again or contact us directly.",
      message: "Something went wrong. Please try again or contact us directly.",
    }
  }
}

// This function processes the form data from the client component
export async function processFormSubmission(formData: FormData) {
  const data = {
    name: (formData.get("name") || "").toString().trim(),
    email: (formData.get("email") || "").toString().trim(),
    phone: (formData.get("phone") || "").toString().trim(),
    service: (formData.get("service") || "").toString().trim(),
    message: (formData.get("message") || "").toString().trim(),
  }

  // (Optional) Minimal validation
  if (!data.name || !data.email || !data.service || !data.message) {
    return {
      success: false,
      error: "Please fill in all required fields.",
      message: "Please fill in all required fields.",
    }
  }

  return submitContactForm(data)
}
