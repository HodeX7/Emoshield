"use client";

import { useState, useEffect } from "react";
import WebsitesList from "@/components/WebsitesList";
import EmojiSequence from "@/components/EmojiSequence";

export default function Home() {
  const [websites, setWebsites] = useState([]);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) {
      setEmail(storedEmail);
      fetchUserData(storedEmail);
    } else {
      setLoading(false);
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
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center text-5xl">
        Loading...
      </div>
    );
  }

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
