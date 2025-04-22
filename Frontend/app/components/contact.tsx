import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function Contact() {
  return (
    <section id="contato" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white">
          Entre em Contato
        </h2>
        <form className="max-w-lg mx-auto px-4">
          <div className="grid gap-6">
            <Input type="text" placeholder="Nome" className="bg-white dark:bg-gray-700 text-gray-800 dark:text-white" />
            <Input
              type="email"
              placeholder="E-mail"
              className="bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
            />
            <Textarea placeholder="Mensagem" className="h-32 bg-white dark:bg-gray-700 text-gray-800 dark:text-white" />
            <Button className="bg-green-600 hover:bg-green-700 text-white dark:bg-green-700 dark:hover:bg-green-600 w-full py-3 rounded-md font-semibold transition-colors">
              Enviar Mensagem
            </Button>
          </div>
        </form>
      </div>
    </section>
  )
}

