"use client"

import { useState } from "react"
import { X } from "lucide-react"

interface BookingModalProps {
  plan: string | null
  onClose: () => void
}

const planNames: { [key: string]: string } = {
  session: "SESSION",
  premium: "PREMIUM",
  pro: "PRO",
  custom: "CUSTOM",
}

export default function BookingModal({ plan, onClose }: BookingModalProps) {
  const [selectedDate, setSelectedDate] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  const handleWhatsApp = () => {
    if (!selectedDate || !name || !email) {
      alert("Por favor completa todos los campos")
      return
    }

    const planName = planNames[plan || "session"]
    const message = `Hola Dark Frame Motors! Quisiera reservar el plan *${planName}* para la fecha ${selectedDate}. Mi nombre es ${name} y mi email es ${email}. Gracias!`

    const whatsappLink = `https://wa.me/573001234567?text=${encodeURIComponent(message)}`
    window.open(whatsappLink, "_blank")
  }

  return (
    <div className="fixed inset-0 z-50 bg-background/90 backdrop-blur flex items-center justify-center p-6">
      <div className="bg-card border-2 border-accent max-w-md w-full p-8 relative">
        <button onClick={onClose} className="absolute top-6 right-6 text-foreground hover:text-accent transition">
          <X size={24} />
        </button>

        <h3 className="text-2xl font-black mb-2 tracking-wider">RESERVAR</h3>
        <p className="text-accent font-bold mb-6">{planNames[plan || "session"]}</p>

        <div className="space-y-4 mb-8">
          <div>
            <label className="block text-xs font-black tracking-widest mb-2">NOMBRE</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-background border border-border px-4 py-3 text-foreground focus:border-accent outline-none transition"
              placeholder="Tu nombre"
            />
          </div>

          <div>
            <label className="block text-xs font-black tracking-widest mb-2">EMAIL</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-background border border-border px-4 py-3 text-foreground focus:border-accent outline-none transition"
              placeholder="tu@email.com"
            />
          </div>

          <div>
            <label className="block text-xs font-black tracking-widest mb-2">FECHA DESEADA</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full bg-background border border-border px-4 py-3 text-foreground focus:border-accent outline-none transition"
            />
          </div>
        </div>

        <button
          onClick={handleWhatsApp}
          className="w-full bg-accent text-accent-foreground py-3 font-black tracking-widest hover:bg-accent/90 transition border-2 border-accent"
        >
          RESERVAR VÍA WHATSAPP
        </button>

        <p className="text-xs text-muted-foreground text-center mt-4">Te contactaremos para confirmar</p>
      </div>
    </div>
  )
}
