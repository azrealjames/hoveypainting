"use server"

import nodemailer from "nodemailer"

interface FormState {
  message: string
  success: boolean | null
}

export async function processFormSubmission(prevState: FormState, formData: FormData): Promise<FormState> {
  try {
    // Extract form data
    const name = formData.get("name")?.toString() || ""
    const email = formData.get("email")?.toString() || ""
    const phone = formData.get("phone")?.toString() || ""
    const okToText = formData.get("okToText")?.toString() === "on"
    const service = formData.get("service")?.toString() || ""
    const message = formData.get("message")?.toString() || ""

    // Optional quick info fields
    const rooms = formData.get("rooms")?.toString() || ""
    const sqft = formData.get("sqft")?.toString() || ""
    const timeline = formData.get("timeline")?.toString() || ""
    const paintPeeling = formData.get("paintPeeling")?.toString() || ""

    // Validate required fields
    if (!name || !email || !phone || !service || !message) {
      return {
        message: "Please fill in all required fields.",
        success: false,
      }
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST,
      port: Number(process.env.EMAIL_SERVER_PORT),
      secure: false,
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    })

    // Build quick info section
    let quickInfo = ""
    if (rooms || sqft || timeline || paintPeeling) {
      quickInfo = "\n\nQUICK INFO:\n"
      if (rooms) quickInfo += `Number of Rooms: ${rooms}\n`
      if (sqft) quickInfo += `Square Footage: ${sqft}\n`
      if (timeline) quickInfo += `Timeline: ${timeline}\n`
      if (paintPeeling) quickInfo += `Paint Peeling/Damaged: ${paintPeeling}\n`
    }

    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL_SERVER_USER,
      to: process.env.EMAIL_SERVER_USER,
      subject: `New Quote Request - ${service}`,
      text: `
NEW QUOTE REQUEST

Name: ${name}
Email: ${email}
Phone: ${phone}
${okToText ? "✓ OK to text scheduling link" : ""}

Service: ${service}
${quickInfo}

MESSAGE:
${message}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #e11d48; border-bottom: 2px solid #e11d48; padding-bottom: 10px;">
            New Quote Request
          </h2>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #333; margin-bottom: 10px;">Contact Information</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            ${okToText ? '<p style="color: #16a34a;"><strong>✓ OK to text scheduling link</strong></p>' : ""}
          </div>

          <div style="margin: 20px 0;">
            <h3 style="color: #333; margin-bottom: 10px;">Service Details</h3>
            <p><strong>Service:</strong> ${service}</p>
          </div>

          ${
            quickInfo
              ? `
          <div style="margin: 20px 0; background: #f3f4f6; padding: 15px; border-radius: 5px;">
            <h3 style="color: #333; margin-bottom: 10px;">Quick Info</h3>
            ${rooms ? `<p><strong>Number of Rooms:</strong> ${rooms}</p>` : ""}
            ${sqft ? `<p><strong>Square Footage:</strong> ${sqft}</p>` : ""}
            ${timeline ? `<p><strong>Timeline:</strong> ${timeline}</p>` : ""}
            ${paintPeeling ? `<p><strong>Paint Peeling/Damaged:</strong> ${paintPeeling}</p>` : ""}
          </div>
          `
              : ""
          }

          <div style="margin: 20px 0;">
            <h3 style="color: #333; margin-bottom: 10px;">Project Details</h3>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
        </div>
      `,
    })

    return {
      message: "Thank you! We'll get back to you within 24 hours.",
      success: true,
    }
  } catch (error) {
    console.error("Form submission error:", error)
    return {
      message: "Sorry, there was an error submitting your request. Please try calling us directly.",
      success: false,
    }
  }
}
