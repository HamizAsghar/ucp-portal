"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import SplashScreen from "@/components/SplashScreen"
import LoginPage from "@/components/LoginPage"

export default function Home() {
  const [showSplash, setShowSplash] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return <main className="min-h-screen">{showSplash ? <SplashScreen /> : <LoginPage />}</main>
}
