"use client"

import { MapPin, Phone, Mail, Recycle, ExternalLink, Clock, Info } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Ecoponto {
  id: number
  nome: string
  endereco: string
  cidade: string
  estado: string
  telefone?: string
  email?: string
  materiais: string[]
  imagem: string
}

interface EcopontoDetalhesModalProps {
  ecoponto: Ecoponto | null
  isOpen: boolean
  onClose: () => void
}

export function EcopontoDetalhesModal({ ecoponto, isOpen, onClose }: EcopontoDetalhesModalProps) {
  if (!ecoponto) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] md:max-w-[700px] lg:max-w-[800px] max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-green-600 dark:text-green-400">{ecoponto.nome}</DialogTitle>
          <div className="flex items-center mt-2">
            <Badge variant="secondary" className="bg-green-500/80 text-white border-none">
              Ecoponto Verificado
            </Badge>
          </div>
        </DialogHeader>

        <Tabs defaultValue="info" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="info">Informações</TabsTrigger>
            <TabsTrigger value="map">Mapa</TabsTrigger>
            <TabsTrigger value="materials">Materiais</TabsTrigger>
          </TabsList>

          <TabsContent value="info" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Coluna de informações */}
              <div className="space-y-5">
                <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3 flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-green-500" />
                    Localização
                  </h3>
                  <div className="pl-6">
                    <p className="text-gray-700 dark:text-gray-300 font-medium">{ecoponto.endereco}</p>
                    <p className="text-gray-600 dark:text-gray-400">
                      {ecoponto.cidade}, {ecoponto.estado}
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3 flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-green-500" />
                    Horário de Funcionamento
                  </h3>
                  <div className="pl-6">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">Segunda a Sexta:</p>
                        <p className="text-gray-700 dark:text-gray-300 font-medium">08:00 - 17:00</p>
                      </div>
                      <div>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">Sábado:</p>
                        <p className="text-gray-700 dark:text-gray-300 font-medium">08:00 - 12:00</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-gray-600 dark:text-gray-400 text-sm">Domingo e Feriados:</p>
                        <p className="text-gray-700 dark:text-gray-300 font-medium">Fechado</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Coluna de contato */}
              <div className="space-y-5">
                <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3 flex items-center">
                    <Info className="h-4 w-4 mr-2 text-green-500" />
                    Contato
                  </h3>
                  <div className="space-y-3 pl-6">
                    {ecoponto.telefone && (
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 text-gray-500 mr-2 shrink-0" />
                        <p className="text-gray-700 dark:text-gray-300">{ecoponto.telefone}</p>
                      </div>
                    )}

                    {ecoponto.email && (
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 text-gray-500 mr-2 shrink-0" />
                        <p className="text-gray-700 dark:text-gray-300">{ecoponto.email}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3 flex items-center">
                    <Info className="h-4 w-4 mr-2 text-green-500" />
                    Informações Adicionais
                  </h3>
                  <div className="pl-6">
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Este ecoponto faz parte da rede oficial de pontos de coleta de materiais recicláveis. Todos os
                      materiais coletados são encaminhados para cooperativas de reciclagem.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="map">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg h-[350px] flex items-center justify-center border border-gray-200 dark:border-gray-700">
              <div className="text-center p-4">
                <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500 dark:text-gray-400 text-base font-medium">Mapa será carregado aqui</p>
                <p className="text-gray-400 dark:text-gray-500 text-sm mt-2 max-w-md mx-auto">
                  A integração com Google Maps será implementada em breve, permitindo visualizar a localização exata e
                  obter direções para este ecoponto.
                </p>
                <Button className="mt-4 bg-green-600 hover:bg-green-700 text-white" type="button">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Abrir no Google Maps
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="materials">
            <div className="bg-gray-50 dark:bg-gray-800/50 p-5 rounded-lg">
              <h3 className="text-lg font-medium mb-4 flex items-center">
                <Recycle className="h-5 w-5 mr-2 text-green-500" />
                Materiais aceitos neste ecoponto
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {ecoponto.materiais.map((material) => (
                  <div
                    key={material}
                    className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-3 flex items-center"
                  >
                    <Recycle className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-gray-700 dark:text-gray-300">{material}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-md border border-green-100 dark:border-green-900/30">
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  <strong>Dica:</strong> Lembre-se de limpar e separar os materiais antes de levá-los ao ecoponto. Isso
                  facilita o processo de reciclagem e aumenta a eficiência do reaproveitamento.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

