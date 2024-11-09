import { NeonGradientCard } from "./ui/neon-gradient-card";
const dummyWebsites = [
  "Linkedin.com",
  "Facebook.com",
  "Emoshield.com",
  "Apple.com",
  "Leetcode.com",
];
function WebsitesList({ websites }) {
  return (
    <div className="mt-10 ">
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
