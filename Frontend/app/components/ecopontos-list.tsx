"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, ChevronLeft, ChevronRight } from "lucide-react"
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel"
import { EcopontoDetalhesModal } from "./ecoponto-detalhes-modal"

// Simular dados de ecopontos (em uma aplicação real, estes viriam do banco de dados)
const ecopontos = [
  {
    id: 1,
    nome: "EcoPonto Central",
    endereco: "Rua das Flores, 123",
    cidade: "São Paulo",
    estado: "SP",
    telefone: "(11) 1234-5678",
    email: "contato@ecopontocentral.com",
    materiais: ["Papel", "Plástico", "Vidro", "Metal"],
    imagem: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    nome: "Reciclagem Verde",
    endereco: "Avenida das Árvores, 456",
    cidade: "Rio de Janeiro",
    estado: "RJ",
    telefone: "(21) 2345-6789",
    email: "contato@reciclagemverde.com",
    materiais: ["Eletrônicos", "Pilhas", "Baterias"],
    imagem: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    nome: "Ponto Sustentável",
    endereco: "Praça da Sustentabilidade, 789",
    cidade: "Belo Horizonte",
    estado: "MG",
    telefone: "(31) 3456-7890",
    email: "contato@pontosustentavel.com",
    materiais: ["Papel", "Plástico", "Óleo de cozinha"],
    imagem: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 4,
    nome: "Recicla Tudo",
    endereco: "Alameda dos Recicladores, 101",
    cidade: "Curitiba",
    estado: "PR",
    telefone: "(41) 4567-8901",
    email: "contato@reciclatudo.com",
    materiais: ["Papel", "Plástico", "Vidro", "Metal", "Eletrônicos", "Pilhas"],
    imagem: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 5,
    nome: "EcoVida",
    endereco: "Rua da Natureza, 202",
    cidade: "Salvador",
    estado: "BA",
    telefone: "(71) 5678-9012",
    email: "contato@ecovida.com",
    materiais: ["Papel", "Plástico", "Vidro", "Óleo de cozinha"],
    imagem: "/placeholder.svg?height=200&width=300",
  },
]

export default function EcopontosList() {
  const [isMobile, setIsMobile] = useState(false)
  const [selectedEcoponto, setSelectedEcoponto] = useState<(typeof ecopontos)[0] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [materiaisVisiveis, setMateriaisVisiveis] = useState<Record<number, number>>({})

  // Detectar se é dispositivo móvel para ajustar o carrossel
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)

    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  // Função para abrir o modal com os detalhes do ecoponto
  const handleVerDetalhes = (ecoponto: (typeof ecopontos)[0]) => {
    setSelectedEcoponto(ecoponto)
    setIsModalOpen(true)
  }

  // Função para exibir materiais com indicador "..." quando necessário
  const renderMateriais = (ecopontoId: number, materiais: string[]) => {
    // Mostrar até 2 materiais + "..." se houver mais
    const maxVisivel = 2

    if (materiais.length <= maxVisivel) {
      return materiais.map((material) => (
        <Badge key={material} variant="secondary" className="text-xs">
          {material}
        </Badge>
      ))
    }

    return (
      <>
        {materiais.slice(0, maxVisivel).map((material) => (
          <Badge key={material} variant="secondary" className="text-xs">
            {material}
          </Badge>
        ))}
        <Badge variant="secondary" className="text-xs">
          ...
        </Badge>
      </>
    )
  }

  return (
    <section id="ecopontos-cadastrados" className="py-16 md:py-20 lg:py-24 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8 md:mb-12 text-gray-800 dark:text-white fade-in">
          Ecopontos Cadastrados
        </h2>

        <div className="relative px-8 md:px-16">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {ecopontos.map((ecoponto) => (
                <CarouselItem key={ecoponto.id} className={isMobile ? "basis-full" : "basis-1/2 lg:basis-1/3"}>
                  <div className="p-1">
                    <Card className="h-full bg-gray-50 dark:bg-gray-800 border-none shadow-md hover:shadow-lg transition-all duration-300">
                      <div className="relative h-40 overflow-hidden rounded-t-lg">
                        <img
                          src={ecoponto.imagem || "/placeholder.svg"}
                          alt={ecoponto.nome}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardHeader className="py-3 px-4">
                        <CardTitle className="text-lg font-semibold text-green-600 dark:text-green-400">
                          {ecoponto.nome}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="py-2 px-4 pb-4">
                        <div className="space-y-3">
                          <div className="flex items-start gap-2">
                            <MapPin className="h-4 w-4 text-gray-500 mt-0.5 shrink-0" />
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                              {ecoponto.cidade}/{ecoponto.estado}
                            </p>
                          </div>

                          <div className="h-[32px]">
                            <div className="flex flex-wrap gap-1">
                              {renderMateriais(ecoponto.id, ecoponto.materiais)}
                            </div>
                          </div>

                          <Button
                            className="w-full mt-2 bg-green-600 hover:bg-green-700 text-white"
                            size="sm"
                            onClick={() => handleVerDetalhes(ecoponto)}
                            type="button"
                          >
                            Ver detalhes
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <div className="hidden md:block">
              <CarouselPrevious className="-left-4 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700" />
              <CarouselNext className="-right-4 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700" />
            </div>
          </Carousel>

          {/* Controles de navegação para dispositivos móveis */}
          <div className="flex justify-center gap-4 mt-6 md:hidden">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full bg-white dark:bg-gray-800"
              onClick={() => document.querySelector<HTMLButtonElement>(".embla__prev")?.click()}
              type="button"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Anterior</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full bg-white dark:bg-gray-800"
              onClick={() => document.querySelector<HTMLButtonElement>(".embla__next")?.click()}
              type="button"
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Próximo</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Modal de detalhes do ecoponto */}
      <EcopontoDetalhesModal ecoponto={selectedEcoponto} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  )
}

