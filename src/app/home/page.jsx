"use client";

import { useState, useEffect } from "react";
import WebsitesList from "@/components/WebsitesList";
import EmojiSequence from "@/components/EmojiSequence";

export default function Home() {
  const [websites, setWebsites] = useState([]);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) {
      setEmail(storedEmail);
      fetchUserData(storedEmail);
    }
  }, []);

  const fetchUserData = async (email) => {
    try {
      const response = await fetch(
        `/api/user?email=${encodeURIComponent(email)}`
      );
      const data = await response.json();
      if (data.email) {
        setWebsites(data.login_websites);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  return (
    <div>
      {websites.length > 0 ? (
        <WebsitesList websites={websites} />
      ) : (
        <EmojiSequence email={email} />
      )}
    </div>
  );
}
