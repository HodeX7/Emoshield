"use client";
import { useState, useRef } from "react";
import dynamic from "next/dynamic";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { useRouter } from "next/navigation";

const EmojiPicker = dynamic(() => import("emoji-picker-react"), { ssr: false });

export default function EmojiSequence({ email }) {
  const [emojis, setEmojis] = useState(Array(6).fill(""));
  const inputRefs = useRef([]);
  const [currentInputIndex, setCurrentInputIndex] = useState(0);
  const router = useRouter();

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
      const response = await fetch("/api/updateUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          emojiSequence: emojis.join(""),
          email,
        }),
      });

      const data = await response.json();
      console.log(data.message);
      window.location.reload(true);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col justify-center w-1/2">
        <h2 className="text-3xl">
          Select a sequence of 6 emojis as your password:
        </h2>
        <div className="grid-cols-3 grid mb-5 mt-5 ">
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
          <RainbowButton onClick={submit}> Get Emoshielded! </RainbowButton>
        </div>
        <p className="mt-14 text-2xl">
          Use the following prompt to generate a set of emojis for your own
          custom story
        </p>
        <p>Give me a sequence of 6 emojis for the following story:</p>
      </div>
      <EmojiPicker onEmojiClick={handleEmojiClick} />
    </div>
  );
}
