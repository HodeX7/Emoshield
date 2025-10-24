"use client";
import { MagicCard } from "@/components/ui/magic-card";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import ShinyButton from "@/components/ui/shiny-button";

export default function Form() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [boxes, setBoxes] = useState(false);
  const [otp, setOtp] = useState(Array(6).fill(""));
  const inputRefs = useRef([]);
  const router = useRouter();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Load previously stored email safely after hydration
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedEmail = localStorage.getItem("userEmail");
      if (savedEmail) setEmail(savedEmail);
    }
  }, []);

  const handleSubmit = async () => {
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    setMessage("");

    try {
      if (typeof window !== "undefined") {
        localStorage.setItem("userEmail", email);
      }

      const response = await fetch("/api/sendOTP", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.status === 200) {
        setBoxes(true);
        setMessage(data.message);
      } else if (response.status === 302 && data.redirect) {
        router.push("/login");
      } else {
        setMessage("An unexpected error occurred.");
      }
    } catch (err) {
      console.error("Error sending OTP:", err);
      setMessage("Error sending OTP");
    }
  };

  const handleOTP = async () => {
    const userOtp = otp.join("");
    try {
      const response = await fetch("/api/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: userOtp }),
      });

      const data = await response.json();
      setMessage(data.message || "");

      if (response.status === 200 && typeof window !== "undefined") {
        localStorage.setItem("userEmail", email);
        router.push("/home");
      }
    } catch (err) {
      console.error("Error verifying OTP:", err);
      setMessage("Error verifying OTP");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  const handleOtpChange = (index, value) => {
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      if (otp[index] === "" && index > 0) {
        inputRefs.current[index - 1]?.focus();
      } else {
        newOtp[index] = "";
      }
      setOtp(newOtp);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-4 lg:flex-row lg:gap-4">
      <MagicCard
        className="flex flex-col justify-center items-center w-full max-w-md p-6 shadow-2xl text-xl lg:text-2xl"
        gradientColor="#262626"
      >
        <h1 className="text-center mb-4">Enter Your E-mail Address</h1>

        <input
          className="bg-transparent border-b border-gray-400 mt-4 focus:outline-none text-sm w-full p-2"
          placeholder="example@email.com"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={handleKeyPress}
        />

        {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}

        {boxes ? (
          <div>
            <p className="text-xs mb-5 text-gray-400">
              Email sent to{" "}
              <span className="text-white cursor-pointer">{email}</span>
            </p>
            <div className="flex gap-4 justify-center">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength={1}
                  className="w-8 h-8 bg-transparent border border-gray-500 rounded focus:outline-none text-center text-sm"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                />
              ))}
            </div>
            <ShinyButton onClick={handleOTP} className="mt-4 w-full">
              Get Secured Now
            </ShinyButton>
          </div>
        ) : (
          <ShinyButton onClick={handleSubmit} className="mt-4 w-full">
            Enter Your Email
          </ShinyButton>
        )}

        {message && <p className="text-xs mt-3 text-gray-400">{message}</p>}
      </MagicCard>
    </div>
  );
}
