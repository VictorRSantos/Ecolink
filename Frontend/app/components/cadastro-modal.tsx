"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "../contexts/auth-context"
import { cadastrarEcoponto } from "../actions/ecoponto-actions"

interface CadastroModalProps {
  isOpen: boolean
  onClose: () => void
  onRequestLogin: () => void
}

export function CadastroModal({ isOpen, onClose, onRequestLogin }: CadastroModalProps) {
  const { toast } = useToast()
  const { user, isAuthenticated, updateUserEcoponto } = useAuth()

  const [formData, setFormData] = useState({
    nome: "",
    endereco: "",
    cidade: "",
    estado: "",
    cep: "",
    telefone: "",
    email: "",
    cnpj: "",
    descricao: "",
    materiais: {
      papel: false,
      plastico: false,
      vidro: false,
      metal: false,
      eletronicos: false,
      pilhas: false,
      oleo: false,
    },
  })

  // Redirecionar para login se não estiver autenticado
  useEffect(() => {
    if (isOpen && !isAuthenticated) {
      onClose()
      onRequestLogin()

      toast({
        title: "Login necessário",
        description: "Você precisa estar logado para cadastrar um Ecoponto.",
        variant: "destructive",
      })
    }
  }, [isOpen, isAuthenticated, onClose, onRequestLogin, toast])

  // Preencher o email e CNPJ do usuário logado
  useEffect(() => {
    if (user && isOpen) {
      setFormData((prev) => ({
        ...prev,
        email: user.email,
        cnpj: user.cnpj,
      }))
    }
  }, [user, isOpen])

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }, [])

  const handleCheckboxChange = useCallback((material: string) => {
    setFormData((prev) => ({
      ...prev,
      materiais: {
        ...prev.materiais,
        [material]: !prev.materiais[material as keyof typeof prev.materiais],
      },
    }))
  }, [])

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()

      if (!isAuthenticated) {
        onClose()
        onRequestLogin()
        return
      }

      try {
        await cadastrarEcoponto(formData)

        // Criar um objeto ecoponto com os dados do formulário
        const materiaisArray = Object.entries(formData.materiais)
          .filter(([_, isSelected]) => isSelected)
          .map(([material]) => material)

        // Atualizar o ecoponto do usuário no contexto de autenticação
        const ecopontoData = {
          id: Date.now(), // Simulando um ID único
          nome: formData.nome,
          endereco: formData.endereco,
          cidade: formData.cidade,
          estado: formData.estado,
          cep: formData.cep,
          telefone: formData.telefone,
          email: formData.email,
          cnpj: user?.cnpj || "",
          descricao: formData.descricao,
          materiais: materiaisArray,
        }

        // Atualizar o ecoponto do usuário
        updateUserEcoponto(ecopontoData)

        toast({
          title: (
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>Ecoponto cadastrado com sucesso!</span>
            </div>
          ),
          description: "O novo Ecoponto foi adicionado à nossa base de dados.",
          duration: 5000,
          className: "bg-white dark:bg-gray-800 border-green-500 border-l-4",
        })
        onClose()
      } catch (error) {
        console.error("Erro ao cadastrar ecoponto:", error)
        toast({
          title: "Erro ao cadastrar Ecoponto",
          description: "Por favor, tente novamente mais tarde.",
          variant: "destructive",
          duration: 5000,
        })
      }
    },
    [formData, isAuthenticated, onClose, onRequestLogin, toast, updateUserEcoponto, user?.cnpj],
  )

  // Limpar formulário quando o modal é fechado
  useEffect(() => {
    if (!isOpen) {
      setFormData((prev) => ({
        ...prev,
        nome: "",
        endereco: "",
        cidade: "",
        estado: "",
        cep: "",
        telefone: "",
        descricao: "",
        materiais: {
          papel: false,
          plastico: false,
          vidro: false,
          metal: false,
          eletronicos: false,
          pilhas: false,
          oleo: false,
        },
      }))
    }
  }, [isOpen])

  // Se não estiver autenticado, não renderizar o modal
  if (!isAuthenticated) {
    return null
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] md:max-w-[600px] lg:max-w-[800px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-4">Cadastro de Ecoponto</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              type="text"
              name="nome"
              placeholder="Nome do Ecoponto"
              value={formData.nome}
              onChange={handleChange}
              required
            />
            <Input
              type="text"
              name="endereco"
              placeholder="Endereço"
              value={formData.endereco}
              onChange={handleChange}
              required
            />
            <Input
              type="text"
              name="cidade"
              placeholder="Cidade"
              value={formData.cidade}
              onChange={handleChange}
              required
            />
            <Input
              type="text"
              name="estado"
              placeholder="Estado"
              value={formData.estado}
              onChange={handleChange}
              required
            />
            <Input type="text" name="cep" placeholder="CEP" value={formData.cep} onChange={handleChange} required />
            <Input
              type="tel"
              name="telefone"
              placeholder="Telefone"
              value={formData.telefone}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email e CNPJ pré-preenchidos e desabilitados */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                E-mail
              </label>
              <Input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                disabled
                className="bg-gray-100 dark:bg-gray-700"
              />
              <p className="text-xs text-gray-500">E-mail associado à sua conta</p>
            </div>

            <div className="space-y-2">
              <label htmlFor="cnpj" className="text-sm font-medium">
                CNPJ
              </label>
              <Input
                id="cnpj"
                type="text"
                name="cnpj"
                value={formData.cnpj}
                disabled
                className="bg-gray-100 dark:bg-gray-700"
              />
              <p className="text-xs text-gray-500">CNPJ associado à sua conta</p>
            </div>
          </div>

          <Textarea
            name="descricao"
            placeholder="Descrição do Ecoponto"
            value={formData.descricao}
            onChange={handleChange}
            required
          />
          <div>
            <h3 className="text-lg font-semibold mb-2">Materiais aceitos:</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {Object.keys(formData.materiais).map((material) => (
                <div key={material} className="flex items-center space-x-2">
                  <Checkbox
                    id={material}
                    checked={formData.materiais[material as keyof typeof formData.materiais]}
                    onCheckedChange={() => handleCheckboxChange(material)}
                  />
                  <label
                    htmlFor={material}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {material.charAt(0).toUpperCase() + material.slice(1)}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <Button type="submit" className="w-full">
            Cadastrar Ecoponto
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

