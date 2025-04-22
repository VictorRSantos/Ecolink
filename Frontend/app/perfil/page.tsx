"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "../contexts/auth-context"
import Header from "../components/header"
import Footer from "../components/footer"
import PerfilContentSimplificado from "../components/perfil-content-simplificado"

export default function PerfilPage() {
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  // Redirecionar se não estiver autenticado
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/")
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-16">
        <PerfilContentSimplificado />
      </main>
      <Footer />
    </div>
  )
}

