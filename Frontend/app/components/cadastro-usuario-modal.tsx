"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"

interface CadastroUsuarioModalProps {
  isOpen: boolean
  onClose: () => void
  onCadastroSuccess: (userData: { email: string; cnpj: string }) => void
  onRequestLogin: () => void
}

export function CadastroUsuarioModal({
  isOpen,
  onClose,
  onCadastroSuccess,
  onRequestLogin,
}: CadastroUsuarioModalProps) {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    password: "",
    confirmPassword: "",
    cnpj: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target
      setFormData((prev) => ({ ...prev, [name]: value }))

      // Limpar erro quando o usuário começa a digitar
      if (errors[name]) {
        setErrors((prev) => {
          const newErrors = { ...prev }
          delete newErrors[name]
          return newErrors
        })
      }
    },
    [errors],
  )

  // Função avançada para validar CNPJ
  const validateCNPJ = useCallback((cnpj: string) => {
    // Remover caracteres não numéricos
    const cleanCNPJ = cnpj.replace(/[^\d]/g, "")

    // Verificar se tem 14 dígitos
    if (cleanCNPJ.length !== 14) {
      return false
    }

    // Verificar se todos os dígitos são iguais (caso inválido)
    if (/^(\d)\1+$/.test(cleanCNPJ)) {
      return false
    }

    // Algoritmo de validação do CNPJ
    // Primeiro dígito verificador
    let soma = 0
    let peso = 5

    for (let i = 0; i < 12; i++) {
      soma += Number.parseInt(cleanCNPJ.charAt(i)) * peso
      peso = peso === 2 ? 9 : peso - 1
    }

    let digito = 11 - (soma % 11)
    const dv1 = digito > 9 ? 0 : digito

    // Segundo dígito verificador
    soma = 0
    peso = 6

    for (let i = 0; i < 13; i++) {
      soma += Number.parseInt(cleanCNPJ.charAt(i)) * peso
      peso = peso === 2 ? 9 : peso - 1
    }

    digito = 11 - (soma % 11)
    const dv2 = digito > 9 ? 0 : digito

    // Verificar se os dígitos calculados são iguais aos dígitos informados
    return Number.parseInt(cleanCNPJ.charAt(12)) === dv1 && Number.parseInt(cleanCNPJ.charAt(13)) === dv2
  }, [])

  // Função para formatar CNPJ enquanto o usuário digita
  const formatCNPJ = useCallback((value: string) => {
    // Remover caracteres não numéricos
    const cnpj = value.replace(/\D/g, "")

    // Aplicar máscara: XX.XXX.XXX/XXXX-XX
    return cnpj
      .replace(/^(\d{2})(\d)/, "$1.$2")
      .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/\.(\d{3})(\d)/, ".$1/$2")
      .replace(/(\d{4})(\d)/, "$1-$2")
      .substring(0, 18)
  }, [])

  const handleCNPJChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const formattedCNPJ = formatCNPJ(e.target.value)
      setFormData((prev) => ({ ...prev, cnpj: formattedCNPJ }))

      if (errors.cnpj) {
        setErrors((prev) => {
          const newErrors = { ...prev }
          delete newErrors.cnpj
          return newErrors
        })
      }
    },
    [errors, formatCNPJ],
  )

  const validateForm = useCallback(() => {
    const newErrors: Record<string, string> = {}

    // Validação de nome
    if (!formData.nome) {
      newErrors.nome = "Nome é obrigatório"
    }

    // Validação de email
    if (!formData.email) {
      newErrors.email = "E-mail é obrigatório"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "E-mail inválido"
    }

    // Validação de senha
    if (!formData.password) {
      newErrors.password = "Senha é obrigatória"
    } else if (formData.password.length < 6) {
      newErrors.password = "A senha deve ter pelo menos 6 caracteres"
    }

    // Validação de confirmação de senha
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirmação de senha é obrigatória"
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "As senhas não coincidem"
    }

    // Validação de CNPJ
    if (!formData.cnpj) {
      newErrors.cnpj = "CNPJ é obrigatório"
    } else if (!validateCNPJ(formData.cnpj)) {
      newErrors.cnpj = "CNPJ inválido. Verifique os dígitos informados."
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [formData, validateCNPJ])

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()

      if (!validateForm()) {
        return
      }

      setIsLoading(true)

      try {
        // Simulando uma chamada de API
        await new Promise((resolve) => setTimeout(resolve, 1500))

        // Em uma aplicação real, você faria uma chamada para o backend
        // para cadastrar o usuário

        toast({
          title: "Cadastro realizado com sucesso!",
          description: "Você foi automaticamente conectado ao sistema.",
          className: "bg-white dark:bg-gray-800 border-green-500 border-l-4",
        })

        // Passar os dados do usuário para o callback de sucesso
        onCadastroSuccess({
          email: formData.email,
          cnpj: formData.cnpj,
        })

        onClose()
      } catch (error) {
        console.error("Erro ao fazer cadastro:", error)
        toast({
          title: "Erro ao fazer cadastro",
          description: "Verifique os dados e tente novamente.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    },
    [formData, validateForm, toast, onCadastroSuccess, onClose],
  )

  // Limpar formulário quando o modal é fechado
  useEffect(() => {
    if (!isOpen) {
      setFormData({
        nome: "",
        email: "",
        password: "",
        confirmPassword: "",
        cnpj: "",
      })
      setErrors({})
    }
  }, [isOpen])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-4">Cadastro de Usuário</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="nome" className="text-sm font-medium">
              Nome Completo
            </label>
            <Input
              id="nome"
              type="text"
              name="nome"
              placeholder="Seu nome completo"
              value={formData.nome}
              onChange={handleChange}
              className={cn(errors.nome && "border-red-500")}
            />
            {errors.nome && <p className="text-red-500 text-xs mt-1">{errors.nome}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              E-mail
            </label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="seu@email.com"
              value={formData.email}
              onChange={handleChange}
              className={cn(errors.email && "border-red-500")}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Senha
            </label>
            <Input
              id="password"
              type="password"
              name="password"
              placeholder="******"
              value={formData.password}
              onChange={handleChange}
              className={cn(errors.password && "border-red-500")}
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="text-sm font-medium">
              Confirmar Senha
            </label>
            <Input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              placeholder="******"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={cn(errors.confirmPassword && "border-red-500")}
            />
            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="cnpj" className="text-sm font-medium">
              CNPJ
            </label>
            <Input
              id="cnpj"
              type="text"
              name="cnpj"
              placeholder="XX.XXX.XXX/XXXX-XX"
              value={formData.cnpj}
              onChange={handleCNPJChange}
              className={cn(errors.cnpj && "border-red-500")}
              maxLength={18}
            />
            {errors.cnpj && <p className="text-red-500 text-xs mt-1">{errors.cnpj}</p>}
            <p className="text-xs text-gray-500">
              Digite apenas os números. A formatação será aplicada automaticamente.
            </p>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Cadastrando..." : "Cadastrar"}
          </Button>

          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
            Já tem uma conta?{" "}
            <Button
              variant="link"
              className="p-0 h-auto text-green-600 dark:text-green-400"
              onClick={() => {
                onClose()
                onRequestLogin()
              }}
              type="button"
            >
              Faça login
            </Button>
          </p>
        </form>
      </DialogContent>
    </Dialog>
  )
}

