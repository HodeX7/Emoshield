"use client";
import { useRouter } from "next/navigation";
import { NeonGradientCard } from "./ui/neon-gradient-card";
import { RainbowButton } from "./ui/rainbow-button";

const dummyWebsites = [
  "Linkedin.com",
  "Facebook.com",
  "Emoshield.com",
  "Apple.com",
  "Leetcode.com",
];

function WebsitesList({ websites = dummyWebsites }) {
  const router = useRouter();

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem("userEmail");
        window.location.reload();
        router.push("/");
      } catch (err) {
        console.error("Error during logout:", err);
      }
    } else {
      console.warn("Attempted to use localStorage on the server.");
    }
  };

  return (
    <div className="mt-10">
      <div className="flex justify-end mr-10">
        <RainbowButton onClick={handleLogout}>Logout</RainbowButton>
      </div>

      <h2 className="flex justify-center flex-col items-center text-4xl font-bold">
        Websites using Emoshield SSO:
      </h2>

      <ul className="grid grid-cols-3 mt-20 mx-10 gap-5">
        {websites.map((site, index) => (
          <NeonGradientCard className="cursor-pointer" key={index}>
            {site}
          </NeonGradientCard>
        ))}
      </ul>
    </div>
  );
}

export default WebsitesList;
