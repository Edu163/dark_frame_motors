"use client"

import { Instagram, Mail, Phone } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-black mb-2 tracking-tighter">DFM</h3>
            <p className="text-xs text-muted-foreground tracking-widest">DARK FRAME MOTORS</p>
            <p className="text-sm text-muted-foreground mt-4">Capturando la esencia del asfalto</p>
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
            <div className="flex items-center gap-2 mb-3 text-sm">
              <Phone size={16} className="text-accent" />
              <span className="text-muted-foreground">+57 300 123 45 67</span>
            </div>
            <div className="flex items-center gap-2 mb-4 text-sm">
              <Mail size={16} className="text-accent" />
              <span className="text-muted-foreground">info@darkframemotors.com</span>
            </div>
            <div className="flex gap-4">
              <a href="#" className="text-accent hover:text-foreground transition">
                <Instagram size={20} />
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
