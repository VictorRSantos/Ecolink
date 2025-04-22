"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X, Sun, Moon, User, LogOut, Recycle, Settings } from "lucide-react"
import { useTheme } from "../contexts/theme-context"
import { useAuth } from "../contexts/auth-context"
import { CadastroModal } from "./cadastro-modal"
import { LoginModal } from "./login-modal"
import { CadastroUsuarioModal } from "./cadastro-usuario-modal"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCadastroModalOpen, setIsCadastroModalOpen] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isCadastroUsuarioModalOpen, setIsCadastroUsuarioModalOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const { user, logout, login, isAuthenticated, hasEcoponto } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  // Verificar se estamos na página de perfil
  const isPerfilPage = pathname === "/perfil"

  // Detectar scroll para mudar a aparência do header
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [scrolled])

  // Função para abrir o modal de login
  const openLoginModal = useCallback(() => {
    setIsMenuOpen(false)
    setIsLoginModalOpen(true)
  }, [])

  // Função para abrir o modal de cadastro de usuário
  const openCadastroUsuarioModal = useCallback(() => {
    setIsMenuOpen(false)
    setIsCadastroUsuarioModalOpen(true)
  }, [])

  // Função para abrir o modal de cadastro de ecoponto
  const openCadastroModal = useCallback(() => {
    setIsMenuOpen(false)
    if (isAuthenticated) {
      setIsCadastroModalOpen(true)
    } else {
      setIsLoginModalOpen(true)
    }
  }, [isAuthenticated, hasEcoponto])

  // Navegar para a página de perfil
  const navigateToPerfil = useCallback(() => {
    setIsMenuOpen(false)
    router.push("/perfil")
  }, [router])

  // Navegar para a página inicial
  const navigateToHome = useCallback(() => {
    setIsMenuOpen(false)
    router.push("/")
  }, [router])

  // Fechar menu mobile ao clicar em um link
  const handleLinkClick = useCallback(() => {
    if (isMenuOpen) {
      setIsMenuOpen(false)
    }
  }, [isMenuOpen])

  // Função para lidar com o login bem-sucedido
  const handleLoginSuccess = useCallback(
    (userData: { email: string; cnpj: string }) => {
      login(userData)
    },
    [login],
  )

  // Função para lidar com o cadastro bem-sucedido
  const handleCadastroSuccess = useCallback(
    (userData: { email: string; cnpj: string }) => {
      // Fazer login automático com os dados do usuário cadastrado
      login(userData)
    },
    [login],
  )

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-md py-2" : "bg-transparent py-3"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo e Nome */}
          <Link
            href="/"
            className="flex items-center gap-2 text-lg md:text-xl font-bold text-green-600 dark:text-green-400 transition-colors hover:text-green-700 dark:hover:text-green-300"
          >
            <Recycle className="h-5 w-5 md:h-6 md:w-6" />
            <span>EcoPonto</span>
          </Link>

          {/* Menu de navegação - Desktop - Oculto na página de perfil */}
          <div className="hidden lg:flex items-center space-x-6">
            {!isPerfilPage ? (
              <>
                <Link
                  href="/#como-funciona"
                  className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors relative group"
                  onClick={(e) => {
                    e.preventDefault()
                    document.getElementById("como-funciona")?.scrollIntoView({ behavior: "smooth" })
                    handleLinkClick()
                  }}
                >
                  Como Funciona
                  <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                </Link>
                <Link
                  href="/#ecopontos-cadastrados"
                  className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors relative group"
                  onClick={(e) => {
                    e.preventDefault()
                    document.getElementById("ecopontos-cadastrados")?.scrollIntoView({ behavior: "smooth" })
                    handleLinkClick()
                  }}
                >
                  Ecopontos
                  <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                </Link>
                <Link
                  href="/#sobre"
                  className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors relative group"
                  onClick={(e) => {
                    e.preventDefault()
                    document.getElementById("sobre")?.scrollIntoView({ behavior: "smooth" })
                    handleLinkClick()
                  }}
                >
                  Sobre
                  <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                </Link>
                <Link
                  href="/#contato"
                  className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors relative group"
                  onClick={(e) => {
                    e.preventDefault()
                    document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" })
                    handleLinkClick()
                  }}
                >
                  Contato
                  <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                </Link>
              </>
            ) : (
              <Button
                variant="ghost"
                onClick={navigateToHome}
                className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400"
                type="button"
              >
                Voltar para Home
              </Button>
            )}
          </div>

          {/* Botões de ação - Desktop */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Botão de tema */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
              aria-label={theme === "light" ? "Ativar modo escuro" : "Ativar modo claro"}
              type="button"
            >
              {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </Button>

            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 rounded-full border-green-500 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20"
                    type="button"
                  >
                    <User className="h-4 w-4" />
                    <span className="hidden md:inline">Meu Ecoponto</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 animate-in slide-in-from-top-1 zoom-in-95">
                  <DropdownMenuLabel>
                    <div className="flex flex-col">
                      <span className="font-medium">{user?.email}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">CNPJ: {user?.cnpj}</span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  {hasEcoponto ? (
                    <DropdownMenuItem onClick={navigateToPerfil} className="cursor-pointer">
                      <Settings className="h-4 w-4 mr-2" />
                      Meu Perfil
                    </DropdownMenuItem>
                  ) : (
                    <DropdownMenuItem onClick={openCadastroModal} className="cursor-pointer">
                      <Recycle className="h-4 w-4 mr-2" />
                      Cadastrar Ecoponto
                    </DropdownMenuItem>
                  )}

                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="text-red-500 dark:text-red-400 cursor-pointer">
                    <LogOut className="h-4 w-4 mr-2" />
                    Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button
                  variant="ghost"
                  onClick={openLoginModal}
                  className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:bg-transparent"
                  type="button"
                >
                  Login
                </Button>
                <Button
                  onClick={openCadastroUsuarioModal}
                  className="bg-green-600 hover:bg-green-700 text-white dark:bg-green-700 dark:hover:bg-green-600 rounded-full shadow-sm hover:shadow transition-all"
                  type="button"
                >
                  Cadastre-se
                </Button>
              </>
            )}
          </div>

          {/* Menu mobile e botões */}
          <div className="flex items-center lg:hidden">
            {/* Botão de tema */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="mr-1 text-gray-600 dark:text-gray-300"
              aria-label={theme === "light" ? "Ativar modo escuro" : "Ativar modo claro"}
              type="button"
            >
              {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </Button>

            {/* Botão do menu mobile */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 dark:text-gray-300"
              aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
              type="button"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Menu mobile dropdown */}
      <div
        className={`
          fixed inset-x-0 top-[52px] z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-md
          transform transition-transform duration-300 ease-in-out overflow-auto max-h-[calc(100vh-52px)]
          ${isMenuOpen ? "translate-y-0" : "-translate-y-full"}
          lg:hidden
        `}
      >
        <div className="container mx-auto px-4 py-3">
          <nav className="flex flex-col">
            {/* Links de navegação - Ocultos na página de perfil */}
            {!isPerfilPage ? (
              <>
                <Link
                  href="/#como-funciona"
                  className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors py-3 border-b border-gray-100 dark:border-gray-800"
                  onClick={(e) => {
                    e.preventDefault()
                    document.getElementById("como-funciona")?.scrollIntoView({ behavior: "smooth" })
                    handleLinkClick()
                  }}
                >
                  Como Funciona
                </Link>
                <Link
                  href="/#ecopontos-cadastrados"
                  className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors py-3 border-b border-gray-100 dark:border-gray-800"
                  onClick={(e) => {
                    e.preventDefault()
                    document.getElementById("ecopontos-cadastrados")?.scrollIntoView({ behavior: "smooth" })
                    handleLinkClick()
                  }}
                >
                  Ecopontos
                </Link>
                <Link
                  href="/#sobre"
                  className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors py-3 border-b border-gray-100 dark:border-gray-800"
                  onClick={(e) => {
                    e.preventDefault()
                    document.getElementById("sobre")?.scrollIntoView({ behavior: "smooth" })
                    handleLinkClick()
                  }}
                >
                  Sobre
                </Link>
                <Link
                  href="/#contato"
                  className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors py-3 border-b border-gray-100 dark:border-gray-800"
                  onClick={(e) => {
                    e.preventDefault()
                    document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" })
                    handleLinkClick()
                  }}
                >
                  Contato
                </Link>
              </>
            ) : (
              <Button
                variant="ghost"
                onClick={navigateToHome}
                className="justify-start px-0 hover:bg-transparent text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 py-3 border-b border-gray-100 dark:border-gray-800"
                type="button"
              >
                Voltar para Home
              </Button>
            )}

            {isAuthenticated ? (
              <>
                <div className="py-3 border-b border-gray-100 dark:border-gray-800">
                  <div className="text-sm text-gray-500 dark:text-gray-400">Logado como:</div>
                  <div className="font-medium">{user?.email}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">CNPJ: {user?.cnpj}</div>
                </div>

                {hasEcoponto ? (
                  <Button
                    variant="ghost"
                    className="justify-start px-0 hover:bg-transparent text-green-600 dark:text-green-400 py-3 border-b border-gray-100 dark:border-gray-800"
                    onClick={navigateToPerfil}
                    type="button"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Meu Perfil
                  </Button>
                ) : (
                  <Button
                    variant="ghost"
                    className="justify-start px-0 hover:bg-transparent text-green-600 dark:text-green-400 py-3 border-b border-gray-100 dark:border-gray-800"
                    onClick={openCadastroModal}
                    type="button"
                  >
                    <Recycle className="h-4 w-4 mr-2" />
                    Cadastrar Ecoponto
                  </Button>
                )}

                <Button
                  variant="ghost"
                  className="justify-start px-0 hover:bg-transparent text-red-500 dark:text-red-400 py-3"
                  onClick={logout}
                  type="button"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sair
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  className="justify-start px-0 hover:bg-transparent text-gray-700 dark:text-gray-300 py-3 border-b border-gray-100 dark:border-gray-800"
                  onClick={openLoginModal}
                  type="button"
                >
                  Login
                </Button>
                <div className="py-3">
                  <Button
                    className="w-full bg-green-600 hover:bg-green-700 text-white dark:bg-green-700 dark:hover:bg-green-600"
                    onClick={openCadastroUsuarioModal}
                    type="button"
                  >
                    Cadastre-se
                  </Button>
                </div>
              </>
            )}
          </nav>
        </div>
      </div>

      {/* Modais */}
      <CadastroModal
        isOpen={isCadastroModalOpen}
        onClose={() => setIsCadastroModalOpen(false)}
        onRequestLogin={openLoginModal}
      />
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        onRequestCadastro={openCadastroUsuarioModal}
      />
      <CadastroUsuarioModal
        isOpen={isCadastroUsuarioModalOpen}
        onClose={() => setIsCadastroUsuarioModalOpen(false)}
        onCadastroSuccess={handleCadastroSuccess}
        onRequestLogin={openLoginModal}
      />
    </header>
  )
}

