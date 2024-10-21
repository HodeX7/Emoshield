"use client";

import { motion, Variants } from "framer-motion";

import { cn } from "@/lib/utils";

export default function WordFadeIn({
                               words,
                               delay = 0.55,
                               variants = {
                                   hidden: { opacity: 0 },
                                   visible: (i) => ({
                                       y: 0,
                                       opacity: 1,
                                       transition: { delay: i * delay },
                                   }),
                               },
                               className,
                           }) {
    const _words = words.split(" ");

    return (
        <motion.h1
            variants={variants}
            initial="hidden"
            animate="visible"
            className={cn(
                "font-display text-center text-4xl font-bold tracking-[-0.02em] bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block bg-clip-text text-transparent drop-shadow-sm dark:text-transparent md:text-7xl md:leading-[5rem]",
                className,
            )}
        >
            {_words.map((word, i) => (
                <motion.span key={word} variants={variants} custom={i}>
                    {word}{" "}
                </motion.span>
            ))}
        </motion.h1>
    );
}
