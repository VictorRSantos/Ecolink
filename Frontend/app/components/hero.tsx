"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ResultadosBuscaModal } from "./resultados-busca-modal"

export default function Hero() {
  const [localizacao, setLocalizacao] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (localizacao.trim()) {
      setIsModalOpen(true)
    }
  }

  return (
    <section className="gradient-bg text-white pt-24 pb-16 md:pt-32 md:pb-20 lg:pt-40 lg:pb-24">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 md:mb-6 leading-tight">
          Localize Ecopontos de Reciclagem
        </h1>
        <p
          className="text-base md:text-lg lg:text-xl mb-6 md:mb-8 max-w-3xl mx-auto fade-in"
          style={{ animationDelay: "0.2s" }}
        >
          Encontre facilmente os pontos de reciclagem mais próximos de você e contribua para um mundo mais sustentável.
        </p>
        <form
          onSubmit={handleSearch}
          className="max-w-md mx-auto flex flex-col sm:flex-row gap-3 fade-in"
          style={{ animationDelay: "0.4s" }}
        >
          <Input
            type="text"
            placeholder="Digite sua localização"
            className="bg-white text-gray-800 dark:bg-gray-800 dark:text-white w-full py-2 px-4 rounded-full"
            value={localizacao}
            onChange={(e) => setLocalizacao(e.target.value)}
          />
          <Button
            type="submit"
            className="bg-yellow-500 hover:bg-yellow-600 text-gray-800 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:text-white w-full sm:w-auto py-2 px-6 rounded-full font-semibold transition-colors pulse"
          >
            Buscar
          </Button>
        </form>
      </div>

      <ResultadosBuscaModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} localizacao={localizacao} />
    </section>
  )
}

