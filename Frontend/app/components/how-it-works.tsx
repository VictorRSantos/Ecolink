import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, MapPin, Recycle } from "lucide-react"

export default function HowItWorks() {
  const steps = [
    {
      icon: <Search className="w-12 h-12 text-green-600 dark:text-green-400" />,
      title: "Busque",
      description: "Digite sua localização ou permita que detectemos automaticamente.",
    },
    {
      icon: <MapPin className="w-12 h-12 text-green-600 dark:text-green-400" />,
      title: "Localize",
      description: "Veja os ecopontos mais próximos de você no mapa.",
    },
    {
      icon: <Recycle className="w-12 h-12 text-green-600 dark:text-green-400" />,
      title: "Recicle",
      description: "Leve seus materiais recicláveis ao ecoponto escolhido.",
    },
  ]

  return (
    <section id="como-funciona" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white fade-in">
          Como Funciona
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <Card
              key={index}
              className="text-center transition-all duration-300 ease-in-out hover-elevate dark:bg-gray-700 border-none fade-in"
              style={{ animationDelay: `${0.2 * (index + 1)}s` }}
            >
              <CardHeader>
                <div className="mx-auto bg-green-100 dark:bg-green-800 rounded-full p-4 mb-4">{step.icon}</div>
                <CardTitle className="text-xl font-semibold text-gray-800 dark:text-white">{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

