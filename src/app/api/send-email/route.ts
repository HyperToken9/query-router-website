// app/api/send-email/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";

// Initialize Resend with your API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    // 1. Parse the request body to get the email
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // 2. Send the email using Resend
    const { data, error } = await resend.emails.send({
      from: "Onboarding <onboarding@resend.dev>", // Your "from" address (see setup step)
      to: ["thequeryrouter@gmail.com"], // The email address you want to receive it at
      subject: "New Form Submission",
      html: `<p>You have a new submission from:</p><strong>${email}</strong>`,

      // Optional: You can also send a confirmation to the user
      // to: [email],
      // subject: 'Thanks for submitting!',
      // html: '<p>We received your request.</p>'
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // 3. Send a success response back to the front-end
    return NextResponse.json({ message: "Email sent successfully!", data });
  } catch (error) {
    console.error("API route error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
