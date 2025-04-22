"use client"

import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <h3 className="text-xl font-semibold mb-4">EcoPonto</h3>
            <p className="text-gray-400">Facilitando a reciclagem e promovendo um mundo mais sustentável.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/#como-funciona"
                  className="text-gray-400 hover:text-green-400 transition-colors"
                  onClick={(e) => {
                    e.preventDefault()
                    document.getElementById("como-funciona")?.scrollIntoView({ behavior: "smooth" })
                  }}
                >
                  Como Funciona
                </Link>
              </li>
              <li>
                <Link
                  href="/#ecopontos-cadastrados"
                  className="text-gray-400 hover:text-green-400 transition-colors"
                  onClick={(e) => {
                    e.preventDefault()
                    document.getElementById("ecopontos-cadastrados")?.scrollIntoView({ behavior: "smooth" })
                  }}
                >
                  Ecopontos
                </Link>
              </li>
              <li>
                <Link
                  href="/#sobre"
                  className="text-gray-400 hover:text-green-400 transition-colors"
                  onClick={(e) => {
                    e.preventDefault()
                    document.getElementById("sobre")?.scrollIntoView({ behavior: "smooth" })
                  }}
                >
                  Sobre
                </Link>
              </li>
              <li>
                <Link
                  href="/#contato"
                  className="text-gray-400 hover:text-green-400 transition-colors"
                  onClick={(e) => {
                    e.preventDefault()
                    document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" })
                  }}
                >
                  Contato
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Siga-nos</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                Facebook
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                Twitter
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                Instagram
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 text-center">
          <p className="text-gray-400">&copy; 2023 EcoPonto. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

