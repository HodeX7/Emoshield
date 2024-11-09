"use client";
import { useState, useRef } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { RainbowButton } from "@/components/ui/rainbow-button";

const EmojiPicker = dynamic(() => import("emoji-picker-react"), { ssr: false });

export default function Login() {
  const [emojis, setEmojis] = useState(Array(6).fill(""));
  const inputRefs = useRef([]);
  const [currentInputIndex, setCurrentInputIndex] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const email = localStorage.getItem("userEmail");

  const handleEmojiClick = (emojiData) => {
    setEmojis((prevEmojis) => {
      const newEmojis = [...prevEmojis];
      newEmojis[currentInputIndex] = emojiData.emoji;

      const nextIndex = newEmojis.findIndex((emoji) => emoji === "");
      if (nextIndex !== -1) {
        setCurrentInputIndex(nextIndex);
        inputRefs.current[nextIndex].focus();
      }

      return newEmojis;
    });
  };

  const handleKeyPress = (e, i) => {
    if (e.key === "Backspace") {
      const newEmojis = [...emojis];
      newEmojis[i] = "";
      setEmojis(newEmojis);

      const prevIndex = i > 0 ? i - 1 : 0;
      setCurrentInputIndex(prevIndex);
      inputRefs.current[prevIndex].focus();
    }
  };

  const submit = async () => {
    if (emojis.includes("")) {
      alert("Please fill all the emoji fields.");
      return;
    }

    try {
      const response = await fetch("/api/validateEmojiSequence", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          emojiSequence: emojis.join(""),
          email,
        }),
      });

      const data = await response.json();

      if (response.status === 200) {
        router.push("/home");
      } else {
        setErrorMessage(
          data.message || "Invalid credentials, please try again."
        );
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage("Server error, please try again later.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col justify-center w-1/2">
        <h2 className="text-3xl">Enter Your Emoji Sequence</h2>

        {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}

        <div className="grid-cols-3 grid mb-5 mt-5">
          {emojis.map((emoji, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              maxLength={1}
              className="w-16 h-16 bg-transparent border border-gray-500 rounded text-4xl text-center mb-6"
              value={emoji}
              onKeyDown={(e) => handleKeyPress(e, index)}
              readOnly
            />
          ))}
        </div>

        <div>
          <RainbowButton onClick={submit}>Get Emoshielded!</RainbowButton>
        </div>
      </div>

      <EmojiPicker onEmojiClick={handleEmojiClick} />
    </div>
  );
}
