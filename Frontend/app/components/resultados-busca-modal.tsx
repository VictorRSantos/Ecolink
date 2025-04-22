"use client"

import { useState, useEffect, useCallback } from "react"
import { MapPin, Phone, Mail, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

// Tipo para os ecopontos
interface Ecoponto {
  id: number
  nome: string
  endereco: string
  cidade: string
  estado: string
  cep: string
  telefone: string
  email: string
  distancia?: number // em km
  materiais: string[]
}

interface ResultadosBuscaModalProps {
  isOpen: boolean
  onClose: () => void
  localizacao: string
}

// Dados simulados de ecopontos
const ecopontosSimulados: Ecoponto[] = [
  {
    id: 1,
    nome: "EcoPonto Central",
    endereco: "Rua das Flores, 123",
    cidade: "São Paulo",
    estado: "SP",
    cep: "01234-567",
    telefone: "(11) 1234-5678",
    email: "contato@ecopontocentral.com",
    distancia: 1.2,
    materiais: ["Papel", "Plástico", "Vidro", "Metal"],
  },
  {
    id: 2,
    nome: "Reciclagem Verde",
    endereco: "Avenida das Árvores, 456",
    cidade: "São Paulo",
    estado: "SP",
    cep: "02345-678",
    telefone: "(11) 2345-6789",
    email: "contato@reciclagemverde.com",
    distancia: 2.5,
    materiais: ["Eletrônicos", "Pilhas", "Baterias"],
  },
  {
    id: 3,
    nome: "Ponto Sustentável",
    endereco: "Praça da Sustentabilidade, 789",
    cidade: "São Paulo",
    estado: "SP",
    cep: "03456-789",
    telefone: "(11) 3456-7890",
    email: "contato@pontosustentavel.com",
    distancia: 3.8,
    materiais: ["Papel", "Plástico", "Óleo de cozinha"],
  },
  {
    id: 4,
    nome: "Recicla Tudo",
    endereco: "Alameda dos Recicladores, 101",
    cidade: "São Paulo",
    estado: "SP",
    cep: "04567-890",
    telefone: "(11) 4567-8901",
    email: "contato@reciclartudo.com",
    distancia: 4.3,
    materiais: ["Papel", "Plástico", "Vidro", "Metal", "Eletrônicos", "Pilhas"],
  },
  {
    id: 5,
    nome: "EcoVida",
    endereco: "Rua da Natureza, 202",
    cidade: "São Paulo",
    estado: "SP",
    cep: "05678-901",
    telefone: "(11) 5678-9012",
    email: "contato@ecovida.com",
    distancia: 5.7,
    materiais: ["Papel", "Plástico", "Vidro", "Óleo de cozinha"],
  },
]

// Lista de todos os materiais possíveis
const todosMateriais = ["Papel", "Plástico", "Vidro", "Metal", "Eletrônicos", "Pilhas", "Baterias", "Óleo de cozinha"]

export function ResultadosBuscaModal({ isOpen, onClose, localizacao }: ResultadosBuscaModalProps) {
  const [ecopontos, setEcopontos] = useState<Ecoponto[]>([])
  const [filtrosMateriais, setFiltrosMateriais] = useState<Record<string, boolean>>({})
  const [isLoading, setIsLoading] = useState(true)
  const [filtrosAbertos, setFiltrosAbertos] = useState(false)

  // Inicializar filtros
  useEffect(() => {
    const filtrosIniciais = todosMateriais.reduce(
      (acc, material) => {
        acc[material] = false
        return acc
      },
      {} as Record<string, boolean>,
    )

    setFiltrosMateriais(filtrosIniciais)
  }, [])

  // Simular busca de ecopontos
  useEffect(() => {
    if (isOpen && localizacao) {
      setIsLoading(true)

      // Simular tempo de carregamento
      const timeoutId = setTimeout(() => {
        // Ordenar por distância
        const ecopontosOrdenados = [...ecopontosSimulados].sort((a, b) => (a.distancia || 0) - (b.distancia || 0))

        setEcopontos(ecopontosOrdenados)
        setIsLoading(false)
      }, 1000)

      return () => clearTimeout(timeoutId)
    }
  }, [isOpen, localizacao])

  // Filtrar ecopontos com base nos materiais selecionados
  const ecopontosFiltrados = ecopontos.filter((ecoponto) => {
    // Se nenhum filtro estiver ativo, mostrar todos
    const algumFiltroAtivo = Object.values(filtrosMateriais).some((value) => value)
    if (!algumFiltroAtivo) return true

    // Verificar se o ecoponto possui pelo menos um dos materiais filtrados
    return ecoponto.materiais.some((material) => filtrosMateriais[material])
  })

  const handleFiltroChange = useCallback((material: string) => {
    setFiltrosMateriais((prev) => ({
      ...prev,
      [material]: !prev[material],
    }))
  }, [])

  const limparFiltros = useCallback(() => {
    const filtrosLimpos = Object.keys(filtrosMateriais).reduce(
      (acc, key) => {
        acc[key] = false
        return acc
      },
      {} as Record<string, boolean>,
    )

    setFiltrosMateriais(filtrosLimpos)
  }, [filtrosMateriais])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] md:max-w-[700px] lg:max-w-[800px] max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <MapPin className="h-5 w-5 text-green-500" />
            Ecopontos próximos a {localizacao}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col md:flex-row gap-4 h-full">
          {/* Painel de filtros */}
          <div className="md:hidden mb-2">
            <Button
              variant="outline"
              onClick={() => setFiltrosAbertos(!filtrosAbertos)}
              className="w-full flex items-center justify-between"
              type="button"
            >
              <span>Filtrar por materiais</span>
              <Filter className="h-4 w-4" />
            </Button>

            {filtrosAbertos && (
              <div className="mt-2 p-4 border rounded-md">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">Materiais aceitos</h3>
                  <Button variant="ghost" size="sm" onClick={limparFiltros} type="button">
                    Limpar
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {todosMateriais.map((material) => (
                    <div key={material} className="flex items-center space-x-2">
                      <Checkbox
                        id={`mobile-${material}`}
                        checked={filtrosMateriais[material]}
                        onCheckedChange={() => handleFiltroChange(material)}
                      />
                      <label htmlFor={`mobile-${material}`} className="text-sm">
                        {material}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Filtros para desktop */}
          <div className="hidden md:block w-1/4 border-r pr-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">Materiais aceitos</h3>
              <Button variant="ghost" size="sm" onClick={limparFiltros} type="button">
                Limpar
              </Button>
            </div>
            <div className="space-y-2">
              {todosMateriais.map((material) => (
                <div key={material} className="flex items-center space-x-2">
                  <Checkbox
                    id={material}
                    checked={filtrosMateriais[material]}
                    onCheckedChange={() => handleFiltroChange(material)}
                  />
                  <label htmlFor={material} className="text-sm">
                    {material}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Lista de resultados */}
          <div className="flex-1 overflow-hidden">
            {isLoading ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
              </div>
            ) : ecopontosFiltrados.length > 0 ? (
              <ScrollArea className="h-[60vh]">
                <div className="space-y-4 pr-4">
                  {ecopontosFiltrados.map((ecoponto) => (
                    <div key={ecoponto.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-lg text-green-600 dark:text-green-400">{ecoponto.nome}</h3>
                        <Badge
                          variant="outline"
                          className="bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                        >
                          {ecoponto.distancia} km
                        </Badge>
                      </div>

                      <p className="text-gray-600 dark:text-gray-300 mt-1">
                        {ecoponto.endereco}, {ecoponto.cidade} - {ecoponto.estado}
                      </p>

                      <div className="flex flex-wrap gap-1 mt-2">
                        {ecoponto.materiais.map((material) => (
                          <Badge key={material} variant="secondary" className="text-xs">
                            {material}
                          </Badge>
                        ))}
                      </div>

                      <Accordion type="single" collapsible className="mt-2">
                        <AccordionItem value="contato" className="border-none">
                          <AccordionTrigger className="py-2 text-sm text-green-600 dark:text-green-400 hover:no-underline">
                            Ver detalhes de contato
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-2 text-sm">
                              <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-gray-500" />
                                <span>{ecoponto.telefone}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-gray-500" />
                                <span>{ecoponto.email}</span>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>

                      <div className="mt-3 pt-3 border-t flex justify-end">
                        <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white" type="button">
                          Como chegar
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <p className="text-gray-500 dark:text-gray-400 mb-2">
                  Nenhum ecoponto encontrado com os filtros selecionados.
                </p>
                <Button variant="outline" onClick={limparFiltros} type="button">
                  Limpar filtros
                </Button>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

