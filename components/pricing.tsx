"use client"

import { useState } from "react"
import BookingModal from "./booking-modal"

interface Plan {
  id: string
  name: string
  price: string
  features: string[]
  highlight?: boolean
}

const plans: Plan[] = [
  {
    id: "session",
    name: "SESSION",
    price: "$120.000 CLP",
    features: [
      "2 horas de sesión",
      "40-80 fotos editadas",
      "1 locación en RM",
      "Entrega digital en 5 días hábiles",
    ],
  },
  {
    id: "premium",
    name: "PREMIUM",
    price: "$280.000 CLP",
    features: [
      "4 horas de sesión",
      "120-200 fotos editadas",
      "Hasta 3 locaciones en RM",
      "Entrega en 3 días hábiles",
      "Detrás de cámaras",
    ],
    highlight: true,
  },
  {
    id: "pro",
    name: "PRO",
    price: "$480.000 CLP",
    features: [
      "8 horas de sesión",
      "Galería curada sin límite",
      "Múltiples locaciones (RM y alrededores)*",
      "Entrega en 48 horas",
      "Video BTS en 4K",
      "Sesión privada",
    ],
  },
  {
    id: "custom",
    name: "CUSTOM",
    price: "Desde $120.000 CLP",
    features: [
      "Plan a medida",
      "Presupuesto según requerimientos",
      "Opciones fuera de RM",
      "Asesoría previa",
      "Cotización sin costo",
    ],
  },
]

export default function Pricing() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [showBooking, setShowBooking] = useState(false)

  return (
    <section className="py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-black mb-4 tracking-tighter">PLANES</h2>
        <p className="text-muted-foreground mb-16 text-lg">ELIGE TU EXPERIENCIA</p>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative border-2 p-8 transition-all duration-300 ${
                plan.highlight ? "border-accent bg-card scale-105" : "border-border hover:border-accent"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-4 bg-accent text-accent-foreground px-3 py-1 text-xs font-black tracking-widest">
                  BESTSELLER
                </div>
              )}

              <h3 className="text-2xl font-black mb-2 tracking-wider">{plan.name}</h3>
              <div className="text-4xl font-black mb-6 tracking-tighter text-accent">{plan.price}</div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="text-sm flex items-start gap-3">
                    <span className="text-accent font-bold mt-1">▸</span>
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => {
                  setSelectedPlan(plan.id)
                  setShowBooking(true)
                }}
                className={`w-full py-3 font-black tracking-widest transition-all duration-300 border-2 ${
                  plan.highlight
                    ? "bg-accent text-accent-foreground border-accent hover:bg-accent/90"
                    : "border-foreground text-foreground hover:bg-foreground hover:text-background"
                }`}
              >
                RESERVAR
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Modal */}
      {showBooking && <BookingModal plan={selectedPlan} onClose={() => setShowBooking(false)} />}
    </section>
  )
}
