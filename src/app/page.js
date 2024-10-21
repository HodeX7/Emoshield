import Header from "@/components/ui/Header";
import Ripple from "@/components/ui/ripple";
import {RainbowButton} from "@/components/ui/rainbow-button";
import Link from "next/link";
import WordRotate from "@/components/ui/word-rotate";

export default function Home() {
  return (
      <div>
          <div className="flex justify-center items-center my-auto h-screen flex-col space-y-4">
              <Ripple/>
              <Header text="Emoji Powered"/>
              <Header text="Passwords That Are"/>
              <WordRotate
                  className="'font-display text-center text-4xl font-bold tracking-[-0.02em] bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block bg-clip-text text-transparent drop-shadow-sm dark:text-transparent md:text-7xl md:leading-[5rem]'"
                  words={["SECURE", "INVINCIBLE", "UNFORGETTABLE"]}
              />
              <Link href='/register'><RainbowButton>Get Your PassEmoji</RainbowButton></Link>
          </div>
      </div>
  );
}
