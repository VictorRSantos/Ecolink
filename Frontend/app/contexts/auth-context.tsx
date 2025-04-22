"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useCallback } from "react"

type Ecoponto = {
  id: number
  nome: string
  endereco: string
  cidade: string
  estado: string
  cep: string
  telefone: string
  email: string
  cnpj: string
  descricao: string
  materiais: string[]
}

type User = {
  email: string
  cnpj: string
  isLoggedIn: boolean
  ecoponto?: Ecoponto | null
}

type AuthContextType = {
  user: User | null
  login: (userData: { email: string; cnpj: string }) => void
  logout: () => void
  isAuthenticated: boolean
  hasEcoponto: boolean
  updateUserEcoponto: (ecoponto: Partial<Ecoponto>) => void
  removeUserEcoponto: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Dados simulados de um ecoponto para demonstração
const ecopontoSimulado: Ecoponto = {
  id: 1,
  nome: "EcoPonto Central",
  endereco: "Rua das Flores, 123",
  cidade: "São Paulo",
  estado: "SP",
  cep: "01234-567",
  telefone: "(11) 1234-5678",
  email: "contato@ecopontocentral.com",
  cnpj: "11.222.333/0001-81",
  descricao: "Centro de reciclagem completo com coleta de diversos materiais.",
  materiais: ["Papel", "Plástico", "Vidro", "Metal"],
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  // Carregar usuário do localStorage apenas uma vez na montagem
  useEffect(() => {
    const storedUser = localStorage.getItem("ecoponto_user")
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser)

        // Para fins de demonstração
        if (parsedUser.email === "demo@example.com") {
          parsedUser.ecoponto = ecopontoSimulado
        }

        setUser({ ...parsedUser, isLoggedIn: true })
      } catch (error) {
        console.error("Erro ao recuperar dados do usuário:", error)
        localStorage.removeItem("ecoponto_user")
      }
    }
  }, [])

  const login = useCallback((userData: { email: string; cnpj: string }) => {
    const ecoponto = userData.email === "demo@example.com" ? ecopontoSimulado : null

    const newUser = {
      ...userData,
      isLoggedIn: true,
      ecoponto,
    }

    setUser(newUser)
    localStorage.setItem("ecoponto_user", JSON.stringify(newUser))
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    localStorage.removeItem("ecoponto_user")
  }, [])

  const updateUserEcoponto = useCallback((ecopontoUpdates: Partial<Ecoponto>) => {
    setUser((prevUser) => {
      if (!prevUser || !prevUser.ecoponto) return prevUser

      const updatedEcoponto = { ...prevUser.ecoponto, ...ecopontoUpdates }
      const updatedUser = { ...prevUser, ecoponto: updatedEcoponto }

      localStorage.setItem("ecoponto_user", JSON.stringify(updatedUser))
      return updatedUser
    })
  }, [])

  const removeUserEcoponto = useCallback(() => {
    setUser((prevUser) => {
      if (!prevUser) return null

      const updatedUser = { ...prevUser, ecoponto: null }
      localStorage.setItem("ecoponto_user", JSON.stringify(updatedUser))
      return updatedUser
    })
  }, [])

  // Valores derivados
  const isAuthenticated = !!user
  const hasEcoponto = !!user?.ecoponto

  const contextValue = {
    user,
    login,
    logout,
    isAuthenticated,
    hasEcoponto,
    updateUserEcoponto,
    removeUserEcoponto,
  }

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

