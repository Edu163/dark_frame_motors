"use client"

import { Menu, X } from "lucide-react"
import { useState } from "react"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/85 backdrop-blur">
      <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex-1">
          <h1 className="text-4xl font-black tracking-tighter text-primary">DFM</h1>
          <p className="text-xs text-muted-foreground tracking-widest mt-1">DARK FRAME MOTORS</p>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-12">
          <a href="#" className="text-sm font-semibold hover:text-accent transition">
            GALERÍA
          </a>
          <a href="#" className="text-sm font-semibold hover:text-accent transition">
            RESERVAR
          </a>
          <a href="#" className="text-sm font-semibold hover:text-accent transition">
            CONTACTO
          </a>
        </nav>

        {/* Mobile Menu */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <nav className="md:hidden bg-card border-t border-border">
          <div className="px-6 py-4 space-y-4 flex flex-col">
            <a href="#" className="text-sm font-semibold">
              GALERÍA
            </a>
            <a href="#" className="text-sm font-semibold">
              RESERVAR
            </a>
            <a href="#" className="text-sm font-semibold">
              CONTACTO
            </a>
          </div>
        </nav>
      )}
    </header>
  )
}
