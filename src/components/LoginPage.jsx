"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { LucideUser, LucideBookOpen } from "lucide-react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
    const [hoveredCard, setHoveredCard] = useState(null)
    const router = useRouter()

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    }

    const item = {
        hidden: { y: 50, opacity: 0 },
        show: { y: 0, opacity: 1, transition: { duration: 0.8 } },
    }

    const cards = [
        {
            id: "teacher",
            title: "Login As Teacher",
            icon: LucideUser,
            color: "from-blue-600 to-blue-400",
            hoverColor: "from-blue-700 to-blue-500",
            route: "/teacherlogin",
        },
        {
            id: "student",
            title: "Login As Student",
            icon: LucideBookOpen,
            color: "from-purple-600 to-purple-400",
            hoverColor: "from-purple-700 to-purple-500",
            route: "/student",
        },
    ]

    const handleCardClick = (route) => {
        router.push(route)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col items-center justify-center p-4">
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full bg-white/5"
                        style={{
                            width: Math.random() * 60 + 20,
                            height: Math.random() * 60 + 20,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, Math.random() * 100 - 50],
                            x: [0, Math.random() * 100 - 50],
                            opacity: [0.1, 0.3, 0.1],
                        }}
                        transition={{
                            duration: Math.random() * 10 + 10,
                            repeat: Number.POSITIVE_INFINITY,
                            repeatType: "reverse",
                        }}
                    />
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16 z-10"
            >
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">UCP Portal</h1>
                <motion.div
                    className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: "60%" }}
                    transition={{ duration: 1, delay: 0.5 }}
                />
                <motion.p
                    className="text-gray-300 mt-4 max-w-md mx-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                >
                    Select your role to continue to the portal
                </motion.p>
            </motion.div>

            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl z-10"
            >
                {cards.map((card) => (
                    <motion.div
                        key={card.id}
                        variants={item}
                        className="w-full"
                        onMouseEnter={() => setHoveredCard(card.id)}
                        onMouseLeave={() => setHoveredCard(null)}
                    >
                        <motion.div
                            className={`relative overflow-hidden rounded-xl p-8 h-64 flex flex-col items-center justify-center cursor-pointer bg-gradient-to-br ${hoveredCard === card.id ? card.hoverColor : card.color
                                } shadow-lg`}
                            whileHover={{
                                scale: 1.05,
                                boxShadow:
                                    "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)",
                            }}
                            transition={{ type: "spring", stiffness: 300 }}
                            onClick={() => handleCardClick(card.route)}
                        >
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent"
                                animate={{
                                    opacity: hoveredCard === card.id ? 0.2 : 0.1,
                                }}
                            />

                            <motion.div
                                className="mb-6 bg-white/20 p-5 rounded-full"
                                whileHover={{ rotate: 5 }}
                                animate={{
                                    y: [0, -10, 0],
                                    transition: {
                                        duration: 2,
                                        repeat: Number.POSITIVE_INFINITY,
                                        repeatType: "loop",
                                    },
                                }}
                            >
                                <card.icon size={40} className="text-white" />
                            </motion.div>

                            <motion.h2
                                className="text-2xl font-bold text-white mb-2 text-center"
                                animate={{
                                    scale: hoveredCard === card.id ? 1.1 : 1,
                                }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                {card.title}
                            </motion.h2>

                            <motion.button
                                className="mt-4 px-6 py-2 bg-white/20 hover:bg-white/30 rounded-full text-white font-medium transition-all"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={(e) => {
                                    e.stopPropagation()
                                    handleCardClick(card.route)
                                }}
                            >
                                Login
                            </motion.button>

                            <motion.div
                                className="absolute -bottom-16 -right-16 w-32 h-32 rounded-full bg-white/10"
                                animate={{
                                    scale: hoveredCard === card.id ? 1.2 : 1,
                                }}
                                transition={{ duration: 0.5 }}
                            />
                            <motion.div
                                className="absolute -top-16 -left-16 w-32 h-32 rounded-full bg-white/10"
                                animate={{
                                    scale: hoveredCard === card.id ? 1.2 : 1,
                                }}
                                transition={{ duration: 0.5 }}
                            />
                        </motion.div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    )
}
