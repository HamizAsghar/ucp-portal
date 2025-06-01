"use client"

import { motion } from "framer-motion"

export default function SplashScreen() {
    return (
        <div className="h-screen w-full flex items-center justify-center bg-gradient-to-r from-purple-700 to-blue-500 overflow-hidden relative">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full bg-white/10 backdrop-blur-sm"
                        style={{
                            width: Math.random() * 100 + 50,
                            height: Math.random() * 100 + 50,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{
                            scale: [0, 1.2, 1],
                            opacity: [0, 0.7, 0.5],
                            x: [0, Math.random() * 100 - 50],
                            y: [0, Math.random() * 100 - 50],
                        }}
                        transition={{
                            duration: 3,
                            ease: "easeInOut",
                            delay: i * 0.1,
                        }}
                    />
                ))}
            </div>

            {/* Main text animation */}
            <motion.div
                className="text-center z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
            >
                <motion.h1
                    className="text-4xl md:text-6xl font-bold text-white mb-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    {/* Animated text with each letter appearing separately */}
                    {"Welcome To UCP Portal".split("").map((char, index) => (
                        <motion.span
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.5,
                                delay: 0.5 + index * 0.05,
                                ease: "easeOut",
                            }}
                            className="inline-block"
                        >
                            {char === " " ? "\u00A0" : char}
                        </motion.span>
                    ))}
                </motion.h1>

                {/* Animated line under text */}
                <motion.div
                    className="h-1 bg-white mx-auto rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: "80%" }}
                    transition={{ duration: 1.5, delay: 1.5 }}
                />
            </motion.div>
        </div>
    )
}
