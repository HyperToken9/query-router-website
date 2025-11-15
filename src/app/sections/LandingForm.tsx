"use client";

import { useState } from "react";

import { XCircleIcon } from "@heroicons/react/24/outline";

import MainButton from "../components/MainButton";

export default function LandingForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // Prevent the default form submission (which reloads the page)
    event.preventDefault();
    setMessage(""); // Clear previous messages
    setEmail("");

    setLoading(true);

    // Send the email data to our API route
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      setEmail("");
      if (response.ok) {
        // Show our success "pop-up" message
        setMessage("Request sent! We'll get back to you soon.");
        // Clear the input field
      } else {
        // Show an error message
        setMessage(`Error: ${data.error || "Something went wrong."}`);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setMessage("Error: Could not send email. Please try again.");
    }
  };

  return (
    <div className="p-5">
      <form
        id="info-form"
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row items-stretch gap-[15px] mb-5"
      >
        <input
          type="email"
          id="your-email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setMessage("");
          }}
          className="bg-pink-100/30 border-pink-100/60 border 
            focus:outline-none
            active:ring-2 hover:ring-2 focus:ring-2 
            hover:ring-purple-200 
            focus:ring-purple-300 active:ring-purple-300
            py-[15px] pl-4 pr-[100px] rounded-xl"
          required
        />
        <MainButton
          type="submit"
          isLoading={loading}
          content="Claim A Free Consult"
        />
      </form>
      {message && (
        <div
          id="success-message"
          className={` ${
            message.startsWith("Error:")
              ? "bg-red-100 text-red-800"
              : "bg-green-100 text-green-800"
          } 
          py-3 px-4 rounded-xl font-bold
          flex justify-between
          `}
        >
          {message}
          <XCircleIcon className="w-6" onClick={() => setMessage("")} />
        </div>
      )}
    </div>
  );
}
