"use client"

import { Instagram, Mail } from "lucide-react"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="inline-flex items-center">
              <Image
                src="/header-image.png"
                alt="Dark Frame Motors"
                width={460}
                height={115}
                className="h-16 md:h-20 w-auto object-contain"
                priority
              />
            </div>
            <p className="text-sm text-muted-foreground mt-4">Capturando la esencia salvaje del asfalto</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-black text-sm mb-4 tracking-widest">ENLACES</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-accent transition">
                  Galería
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition">
                  Reservar
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition">
                  Sobre Nosotros
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition">
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-black text-sm mb-4 tracking-widest">CONTACTO</h4>
            <div className="flex items-center gap-2 mb-4 text-sm">
              <Mail size={16} className="text-accent" />
              <span className="text-muted-foreground">info@darkframemotors.com</span>
            </div>
            <div className="flex items-center gap-2 mb-4 text-sm">
              <a href="https://www.instagram.com/darkframe.motors" className="flex items-center gap-2 text-accent hover:text-foreground transition">
                <Instagram size={20} />
                <span className="text-muted-foreground">Dark Frame Motors Instagram</span>
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border pt-8">
          <p className="text-xs text-muted-foreground text-center tracking-widest">
            © 2025 DARK FRAME MOTORS. TODOS LOS DERECHOS RESERVADOS.
          </p>
        </div>
      </div>
    </footer>
  )
}
