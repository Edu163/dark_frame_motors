"use client"

import { Menu, X } from "lucide-react"
import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const handleGalleryClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    
    // Si estamos en la home, hacer scroll suave
    if (pathname === "/") {
      const section = document.getElementById("galeria")
      if (section) {
        section.scrollIntoView({ behavior: "smooth" })
      }
    } else {
      // Si estamos en otra página, redirigir a home con hash
      router.push("/#galeria")
    }
    
    // Cerrar menú móvil
    setIsOpen(false)
  }

  const handleReservarClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    
    // Si estamos en la home, hacer scroll suave
    if (pathname === "/") {
      const section = document.getElementById("reservar")
      if (section) {
        section.scrollIntoView({ behavior: "smooth" })
      }
    } else {
      // Si estamos en otra página, redirigir a home con hash
      router.push("/#reservar")
    }
    
    // Cerrar menú móvil
    setIsOpen(false)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/85 backdrop-blur">
      <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <a href="/" className="flex-1 cursor-pointer group">
          <h1 className="text-4xl font-black tracking-tighter text-primary group-hover:text-accent transition">DFM</h1>
          <p className="text-xs text-muted-foreground tracking-widest mt-1">DARK FRAME MOTORS</p>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-12">
          <a 
            href="/#galeria" 
            onClick={handleGalleryClick}
            className="text-sm font-semibold hover:text-accent transition"
          >
            GALERÍA
          </a>
          <a 
            href="/#reservar" 
            onClick={handleReservarClick}
            className="text-sm font-semibold hover:text-accent transition"
          >
            RESERVAR
          </a>
          {/* <a href="#" className="text-sm font-semibold hover:text-accent transition">
            CONTACTO
          </a> */}
        </nav>

        {/* Mobile Menu */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <nav className="md:hidden bg-card border-t border-border">
          <div className="px-6 py-4 space-y-4 flex flex-col">
            <a 
              href="/#galeria" 
              onClick={handleGalleryClick}
              className="text-sm font-semibold"
            >
              GALERÍA
            </a>
            <a 
              href="/#reservar" 
              onClick={handleReservarClick}
              className="text-sm font-semibold"
            >
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
