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
function WebsitesList({ websites }) {
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    window.location.reload(true);
    router.push("/");
  };
  return (
    <div className="mt-10 ">
      <div className="flex justify-end mr-10">
        <RainbowButton onClick={handleLogout}>Logout</RainbowButton>
      </div>
      <h2 className="flex justify-center flex-col items-center text-4xl font-bold">
        Websites using Emoshield SSO:
      </h2>
      <div>
        <ul className="grid-cols-3 grid mt-20 mx-10 gap-5">
          {websites.map((site, index) => (
            <NeonGradientCard className="cursor-pointer" key={index}>
              {site}
            </NeonGradientCard>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default WebsitesList;
