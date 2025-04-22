"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "../contexts/auth-context"
import { AlertTriangle, Save } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// Lista de todos os materiais possíveis
const todosMateriais = ["Papel", "Plástico", "Vidro", "Metal", "Eletrônicos", "Pilhas", "Baterias", "Óleo de cozinha"]

export default function PerfilContentSimplificado() {
  const { user, updateUserEcoponto, removeUserEcoponto, logout } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  // Estado para todos os campos do formulário
  const [formData, setFormData] = useState({
    nome: user?.ecoponto?.nome || "",
    endereco: user?.ecoponto?.endereco || "",
    cidade: user?.ecoponto?.cidade || "",
    estado: user?.ecoponto?.estado || "",
    cep: user?.ecoponto?.cep || "",
    telefone: user?.ecoponto?.telefone || "",
    email: user?.ecoponto?.email || user?.email || "",
    descricao: user?.ecoponto?.descricao || "",
  })

  // Estado para materiais aceitos
  const [materiaisSelecionados, setMateriaisSelecionados] = useState<Record<string, boolean>>(() => {
    // Inicializar com os materiais atuais do usuário
    const materiais: Record<string, boolean> = {}
    todosMateriais.forEach((material) => {
      materiais[material] = user?.ecoponto?.materiais?.includes(material) || false
    })
    return materiais
  })

  // Estado para o diálogo de exclusão
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [confirmText, setConfirmText] = useState("")

  // Função para atualizar os campos do formulário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Função para alternar a seleção de um material
  const toggleMaterial = (material: string) => {
    setMateriaisSelecionados((prev) => ({
      ...prev,
      [material]: !prev[material],
    }))
  }

  // Função para selecionar/desmarcar todos os materiais
  const toggleTodosMateriais = () => {
    const todosSelecionados = todosMateriais.every((material) => materiaisSelecionados[material])

    const novoEstado: Record<string, boolean> = {}
    todosMateriais.forEach((material) => {
      novoEstado[material] = !todosSelecionados
    })

    setMateriaisSelecionados(novoEstado)
  }

  // Função para salvar alterações
  const handleSave = () => {
    if (!user?.ecoponto) return

    // Converter objeto de materiais para array
    const materiaisArray = Object.entries(materiaisSelecionados)
      .filter(([_, selecionado]) => selecionado)
      .map(([material]) => material)

    updateUserEcoponto({
      ...formData,
      materiais: materiaisArray,
    })

    toast({
      title: "Perfil atualizado com sucesso!",
      description: "As informações foram atualizadas.",
    })
  }

  // Função para excluir conta
  const handleDelete = () => {
    removeUserEcoponto()
    logout()

    toast({
      title: "Conta excluída",
      description: "Sua conta e dados do ecoponto foram removidos.",
      variant: "destructive",
    })

    router.push("/")
  }

  // Função para sair
  const handleLogout = () => {
    logout()
    router.push("/")
  }

  if (!user?.ecoponto) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Perfil do Usuário</h1>
        <p className="mb-6">Você ainda não possui um ecoponto cadastrado.</p>
        <Button onClick={() => router.push("/")} className="bg-green-600 hover:bg-green-700 text-white" type="button">
          Voltar para a página inicial
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Perfil do Ecoponto</h1>

      <div className="max-w-2xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Informações do Ecoponto</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nome do Ecoponto</label>
                <Input name="nome" value={formData.nome} onChange={handleChange} placeholder="Nome do ecoponto" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">E-mail</label>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="E-mail para contato"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Telefone</label>
                <Input
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleChange}
                  placeholder="Telefone para contato"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Endereço</label>
                <Input
                  name="endereco"
                  value={formData.endereco}
                  onChange={handleChange}
                  placeholder="Endereço completo"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Cidade</label>
                <Input name="cidade" value={formData.cidade} onChange={handleChange} placeholder="Cidade" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Estado</label>
                <Input name="estado" value={formData.estado} onChange={handleChange} placeholder="Estado" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">CEP</label>
                <Input name="cep" value={formData.cep} onChange={handleChange} placeholder="CEP" />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">CNPJ</label>
                <Input value={user.cnpj} disabled className="bg-gray-100 dark:bg-gray-800" />
                <p className="text-xs text-gray-500 mt-1">O CNPJ não pode ser alterado</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Descrição</label>
              <Textarea
                name="descricao"
                value={formData.descricao}
                onChange={handleChange}
                placeholder="Descreva seu ecoponto"
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Materiais Aceitos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm text-gray-500">Selecione os materiais que seu ecoponto aceita:</p>
              <Button variant="outline" size="sm" onClick={toggleTodosMateriais} type="button">
                {todosMateriais.every((m) => materiaisSelecionados[m]) ? "Desmarcar Todos" : "Selecionar Todos"}
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
              {todosMateriais.map((material) => (
                <div
                  key={material}
                  className={`
                    border rounded-md p-3 cursor-pointer transition-all
                    ${
                      materiaisSelecionados[material]
                        ? "bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-800"
                        : "bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700"
                    }
                  `}
                  onClick={() => toggleMaterial(material)}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{material}</span>
                    <Checkbox
                      checked={materiaisSelecionados[material]}
                      onCheckedChange={() => toggleMaterial(material)}
                      className="pointer-events-none"
                    />
                  </div>
                </div>
              ))}
            </div>

            <Separator className="my-4" />

            <div>
              <h3 className="text-sm font-medium mb-2">Materiais selecionados:</h3>
              <div className="flex flex-wrap gap-2">
                {todosMateriais
                  .filter((material) => materiaisSelecionados[material])
                  .map((material) => (
                    <Badge key={material} variant="secondary">
                      {material}
                    </Badge>
                  ))}
                {!todosMateriais.some((material) => materiaisSelecionados[material]) && (
                  <p className="text-sm text-gray-500">Nenhum material selecionado</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-red-200 dark:border-red-900/30 bg-red-50/50 dark:bg-red-900/10">
          <CardHeader>
            <CardTitle className="text-red-600 dark:text-red-400 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Ações da Conta
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Ao excluir sua conta, todos os dados associados ao seu ecoponto serão permanentemente removidos.
            </p>
            <Button variant="destructive" onClick={() => setIsDeleteDialogOpen(true)} type="button">
              Excluir Conta
            </Button>
          </CardContent>
        </Card>

        <div className="flex justify-between">
          <Button variant="outline" onClick={handleLogout} type="button">
            Sair
          </Button>
          <Button onClick={handleSave} type="button" className="bg-green-600 hover:bg-green-700 text-white">
            <Save className="h-4 w-4 mr-2" />
            Salvar Alterações
          </Button>
        </div>
      </div>

      {/* Diálogo de confirmação para excluir conta */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-red-600 dark:text-red-400 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Excluir Conta
            </DialogTitle>
            <DialogDescription>
              Esta ação não pode ser desfeita. Todos os dados associados ao seu ecoponto serão permanentemente
              removidos.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="font-medium">Você tem certeza que deseja excluir sua conta?</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Digite "EXCLUIR" para confirmar:</p>
            <Input
              className="mt-2"
              placeholder="EXCLUIR"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)} type="button">
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDelete} disabled={confirmText !== "EXCLUIR"} type="button">
              Excluir Permanentemente
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

