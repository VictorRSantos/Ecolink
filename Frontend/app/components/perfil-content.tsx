"use client"

import type React from "react"

import { useState, useRef, useEffect, useCallback, useMemo } from "react"
import { useRouter } from "next/navigation"
import { User, MapPin, Phone, Mail, FileText, Tag, Edit, Trash2, AlertTriangle, Save, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useAuth } from "../contexts/auth-context"

// Lista de todos os materiais possíveis
const todosMateriais = ["Papel", "Plástico", "Vidro", "Metal", "Eletrônicos", "Pilhas", "Baterias", "Óleo de cozinha"]

export default function PerfilContent() {
  const { user, updateUserEcoponto, removeUserEcoponto, logout } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  const [isEditing, setIsEditing] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("info")
  const materiaisRef = useRef<HTMLDivElement>(null)

  // Inicializar formData apenas uma vez no carregamento inicial
  const [formData, setFormData] = useState(() => {
    // Função de inicialização que é executada apenas uma vez
    return {
      nome: user?.ecoponto?.nome || "",
      endereco: user?.ecoponto?.endereco || "",
      cidade: user?.ecoponto?.cidade || "",
      estado: user?.ecoponto?.estado || "",
      cep: user?.ecoponto?.cep || "",
      telefone: user?.ecoponto?.telefone || "",
      email: user?.ecoponto?.email || user?.email || "",
      descricao: user?.ecoponto?.descricao || "",
      materiais: todosMateriais.reduce(
        (acc, material) => {
          acc[material] = user?.ecoponto?.materiais?.includes(material) || false
          return acc
        },
        {} as Record<string, boolean>,
      ),
    }
  })

  // Atualizar formData quando o usuário mudar - com verificação para evitar loops
  useEffect(() => {
    if (user?.ecoponto) {
      // Verificar se os dados realmente mudaram antes de atualizar o estado
      const newFormData = {
        nome: user.ecoponto.nome || "",
        endereco: user.ecoponto.endereco || "",
        cidade: user.ecoponto.cidade || "",
        estado: user.ecoponto.estado || "",
        cep: user.ecoponto.cep || "",
        telefone: user.ecoponto.telefone || "",
        email: user.ecoponto.email || user.email || "",
        descricao: user.ecoponto.descricao || "",
        materiais: todosMateriais.reduce(
          (acc, material) => {
            acc[material] = user.ecoponto.materiais?.includes(material) || false
            return acc
          },
          {} as Record<string, boolean>,
        ),
      }

      // Verificar se há diferenças antes de atualizar o estado
      const needsUpdate =
        formData.nome !== newFormData.nome ||
        formData.endereco !== newFormData.endereco ||
        formData.cidade !== newFormData.cidade ||
        formData.estado !== newFormData.estado ||
        formData.cep !== newFormData.cep ||
        formData.telefone !== newFormData.telefone ||
        formData.email !== newFormData.email ||
        formData.descricao !== newFormData.descricao ||
        JSON.stringify(formData.materiais) !== JSON.stringify(newFormData.materiais)

      if (needsUpdate) {
        setFormData(newFormData)
      }
    }
  }, [user])

  // Efeito para rolar até a seção de materiais quando necessário
  useEffect(() => {
    if (activeTab === "edit" && materiaisRef.current) {
      const timeoutId = setTimeout(() => {
        materiaisRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })
      }, 100)

      return () => clearTimeout(timeoutId)
    }
  }, [activeTab])

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }, [])

  const handleCheckboxChange = useCallback((material: string) => {
    setFormData((prev) => ({
      ...prev,
      materiais: {
        ...prev.materiais,
        [material]: !prev.materiais[material],
      },
    }))
  }, [])

  const handleSave = useCallback(() => {
    if (!user?.ecoponto) return

    // Converter materiais de objeto para array
    const materiaisArray = Object.entries(formData.materiais)
      .filter(([_, isSelected]) => isSelected)
      .map(([material]) => material)

    // Atualizar dados do ecoponto
    updateUserEcoponto({
      nome: formData.nome,
      endereco: formData.endereco,
      cidade: formData.cidade,
      estado: formData.estado,
      cep: formData.cep,
      telefone: formData.telefone,
      email: formData.email,
      descricao: formData.descricao,
      materiais: materiaisArray,
    })

    setIsEditing(false)
    setActiveTab("info")

    toast({
      title: "Perfil atualizado com sucesso!",
      description: "As informações do seu ecoponto foram atualizadas.",
      className: "bg-white dark:bg-gray-800 border-green-500 border-l-4",
    })
  }, [formData, updateUserEcoponto, user?.ecoponto, toast])

  const handleDelete = useCallback(() => {
    removeUserEcoponto()
    logout()

    toast({
      title: "Conta excluída",
      description: "Sua conta e dados do ecoponto foram removidos.",
      variant: "destructive",
    })

    router.push("/")
  }, [removeUserEcoponto, logout, toast, router])

  const cancelEdit = useCallback(() => {
    // Restaurar dados originais
    if (user?.ecoponto) {
      setFormData({
        nome: user.ecoponto.nome || "",
        endereco: user.ecoponto.endereco || "",
        cidade: user.ecoponto.cidade || "",
        estado: user.ecoponto.estado || "",
        cep: user.ecoponto.cep || "",
        telefone: user.ecoponto.telefone || "",
        email: user.ecoponto.email || user.email || "",
        descricao: user.ecoponto.descricao || "",
        materiais: todosMateriais.reduce(
          (acc, material) => {
            acc[material] = user.ecoponto.materiais?.includes(material) || false
            return acc
          },
          {} as Record<string, boolean>,
        ),
      })
    }
    setIsEditing(false)
  }, [user])

  const editMateriais = useCallback(() => {
    setActiveTab("edit")
  }, [])

  const handleSelectAllMaterials = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault() // Prevenir comportamento padrão do botão
      const allSelected = todosMateriais.every((material) => formData.materiais[material])
      const newValue = !allSelected

      const updatedMateriais = { ...formData.materiais }
      todosMateriais.forEach((material) => {
        updatedMateriais[material] = newValue
      })

      setFormData((prev) => ({
        ...prev,
        materiais: updatedMateriais,
      }))

      toast({
        title: newValue ? "Todos materiais selecionados" : "Todos materiais desmarcados",
        duration: 2000,
      })
    },
    [formData.materiais, toast],
  )

  // Memoizar a lista de materiais selecionados para evitar recálculos desnecessários
  const materiaisSelecionados = useMemo(() => {
    return Object.entries(formData.materiais)
      .filter(([_, isSelected]) => isSelected)
      .map(([material]) => material)
  }, [formData.materiais])

  // Verificar se todos os materiais estão selecionados
  const todosSelecionados = useMemo(() => {
    return todosMateriais.every((material) => formData.materiais[material])
  }, [formData.materiais])

  // Verificar se nenhum material está selecionado
  const nenhumSelecionado = useMemo(() => {
    return Object.values(formData.materiais).every((v) => !v)
  }, [formData.materiais])

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
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Perfil do Ecoponto</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="info">Informações</TabsTrigger>
          <TabsTrigger value="edit">Editar Perfil</TabsTrigger>
        </TabsList>

        <TabsContent value="info">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Informações principais */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-xl text-green-600 dark:text-green-400 flex items-center gap-2">
                  <User className="h-5 w-5" />
                  {user.ecoponto.nome}
                </CardTitle>
                <CardDescription>CNPJ: {user.cnpj}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-2">
                  <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p>{user.ecoponto.endereco}</p>
                    <p>
                      {user.ecoponto.cidade}, {user.ecoponto.estado} - CEP: {user.ecoponto.cep}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-gray-500" />
                  <p>{user.ecoponto.telefone}</p>
                </div>

                <div className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-gray-500" />
                  <p>{user.ecoponto.email}</p>
                </div>

                <div className="flex items-start gap-2">
                  <FileText className="h-5 w-5 text-gray-500 mt-0.5" />
                  <p>{user.ecoponto.descricao}</p>
                </div>
              </CardContent>
            </Card>

            {/* Materiais aceitos */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Tag className="h-5 w-5 text-green-600 dark:text-green-400" />
                  Materiais Aceitos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {user.ecoponto.materiais.map((material) => (
                    <Badge key={material} variant="secondary">
                      {material}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={editMateriais} className="w-full" type="button">
                  <Edit className="h-4 w-4 mr-2" />
                  Editar Materiais
                </Button>
              </CardFooter>
            </Card>

            {/* Ações da conta */}
            <Card className="lg:col-span-3 bg-gray-50 dark:bg-gray-800/50 border-red-200 dark:border-red-900/30">
              <CardHeader>
                <CardTitle className="text-xl text-red-600 dark:text-red-400 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Ações da Conta
                </CardTitle>
                <CardDescription>Cuidado: estas ações não podem ser desfeitas.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Ao excluir sua conta, todos os dados associados ao seu ecoponto serão permanentemente removidos.
                </p>
                <Button variant="destructive" onClick={() => setIsDeleteDialogOpen(true)} type="button">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Excluir Conta
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="edit">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Editar Informações do Ecoponto</CardTitle>
              <CardDescription>Atualize as informações do seu ecoponto conforme necessário.</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="nome" className="text-sm font-medium">
                      Nome do Ecoponto
                    </label>
                    <Input id="nome" name="nome" value={formData.nome} onChange={handleChange} required />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      E-mail
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="telefone" className="text-sm font-medium">
                      Telefone
                    </label>
                    <Input id="telefone" name="telefone" value={formData.telefone} onChange={handleChange} required />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="endereco" className="text-sm font-medium">
                      Endereço
                    </label>
                    <Input id="endereco" name="endereco" value={formData.endereco} onChange={handleChange} required />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="cidade" className="text-sm font-medium">
                      Cidade
                    </label>
                    <Input id="cidade" name="cidade" value={formData.cidade} onChange={handleChange} required />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="estado" className="text-sm font-medium">
                      Estado
                    </label>
                    <Input id="estado" name="estado" value={formData.estado} onChange={handleChange} required />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="cep" className="text-sm font-medium">
                      CEP
                    </label>
                    <Input id="cep" name="cep" value={formData.cep} onChange={handleChange} required />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="descricao" className="text-sm font-medium">
                    Descrição
                  </label>
                  <Textarea
                    id="descricao"
                    name="descricao"
                    value={formData.descricao}
                    onChange={handleChange}
                    rows={4}
                  />
                </div>

                <div className="space-y-4" ref={materiaisRef}>
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Materiais aceitos</label>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" onClick={handleSelectAllMaterials} type="button">
                        {todosSelecionados ? "Desmarcar Todos" : "Selecionar Todos"}
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {todosMateriais.map((material) => (
                      <div
                        key={material}
                        className={`
                          border rounded-md p-3 cursor-pointer transition-all
                          ${
                            formData.materiais[material]
                              ? "bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-800"
                              : "bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700"
                          }
                        `}
                        onClick={() => handleCheckboxChange(material)}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{material}</span>
                          <Checkbox
                            id={`material-${material}`}
                            checked={formData.materiais[material]}
                            onCheckedChange={() => handleCheckboxChange(material)}
                            className="pointer-events-none"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 p-4 border rounded-md bg-gray-50 dark:bg-gray-800/50">
                    <h4 className="text-sm font-medium mb-2">Materiais selecionados:</h4>
                    <div className="flex flex-wrap gap-2">
                      {materiaisSelecionados.map((material) => (
                        <Badge key={material} variant="secondary" className="px-3 py-1">
                          {material}
                          <X
                            className="h-3 w-3 ml-1 cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleCheckboxChange(material)
                            }}
                          />
                        </Badge>
                      ))}
                      {nenhumSelecionado && (
                        <p className="text-sm text-gray-500 dark:text-gray-400">Nenhum material selecionado</p>
                      )}
                    </div>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={cancelEdit} type="button">
                <X className="h-4 w-4 mr-2" />
                Cancelar
              </Button>
              <Button onClick={handleSave} type="button">
                <Save className="h-4 w-4 mr-2" />
                Salvar Alterações
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

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
              onChange={(e) => {
                const confirmButton = document.getElementById("confirm-delete-button") as HTMLButtonElement
                if (confirmButton) {
                  confirmButton.disabled = e.target.value !== "EXCLUIR"
                }
              }}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)} type="button">
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              id="confirm-delete-button"
              disabled={true}
              type="button"
            >
              Excluir Permanentemente
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

