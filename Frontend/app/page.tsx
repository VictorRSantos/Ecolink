"use client"

import { useEffect } from "react"
import Header from "./components/header"
import Hero from "./components/hero"
import HowItWorks from "./components/how-it-works"
import About from "./components/about"
import Contact from "./components/contact"
import Footer from "./components/footer"
import EcopontosList from "./components/ecopontos-list"

export default function Home() {
  // Função para lidar com a navegação por âncoras quando a página carrega
  useEffect(() => {
    // Verificar se há um hash na URL
    if (window.location.hash) {
      // Dar um pequeno delay para garantir que todos os componentes foram renderizados
      setTimeout(() => {
        const id = window.location.hash.substring(1) // Remover o # do início
        const element = document.getElementById(id)
        if (element) {
          element.scrollIntoView({ behavior: "smooth" })
        }
      }, 100)
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main>
        <Hero />
        <HowItWorks />
        <EcopontosList />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

