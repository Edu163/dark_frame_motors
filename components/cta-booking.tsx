"use client";

export default function CTABooking() {
  const handleInstagramClick = () => {
    const username = "darkframe.motors";
    
    // Detectar si es iOS o Android
    const userAgent = navigator.userAgent || navigator.vendor;
    const isIOS = /iPad|iPhone|iPod/.test(userAgent);
    const isAndroid = /android/i.test(userAgent);
    
    if (isIOS || isAndroid) {
      // Intentar abrir la app de Instagram
      const appUrl = `instagram://user?username=${username}`;
      const webUrl = `https://www.instagram.com/${username}/`;
      
      // Crear un iframe oculto para intentar abrir la app sin cambiar la página
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.src = appUrl;
      document.body.appendChild(iframe);
      
      // Fallback a la web si la app no se abre (después de 500ms)
      const timeout = setTimeout(() => {
        window.location.href = webUrl;
      }, 500);
      
      // Limpiar el iframe después de intentar
      setTimeout(() => {
        document.body.removeChild(iframe);
      }, 1000);
      
      // Si la página pierde el foco (app se abrió), cancelar el fallback
      window.addEventListener('blur', () => {
        clearTimeout(timeout);
      }, { once: true });
    } else {
      // En escritorio, abrir directamente en el navegador
      window.open(`https://www.instagram.com/${username}/`, '_blank');
    }
  };

  return (
    <section id="reservar" className="py-20 px-6 bg-background relative overflow-hidden scroll-mt-24">
      {/* Fondo con textura sutil */}
      <div
        className="pointer-events-none absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'><filter id=\'n\'><feTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'4\' stitchTiles=\'stitch\'/></filter><rect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/></svg>")',
          backgroundSize: '200px 200px',
          backgroundRepeat: 'repeat',
        }}
      />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">
          <span className="text-foreground">CAPTURA TU </span>
          <span className="bg-gradient-to-r from-[#C62828] to-[#EB7A3F] bg-clip-text text-transparent">
            MOMENTO
          </span>
        </h2>
        
        <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto tracking-wide">
          Reserva tu sesión de fotografía automotriz y deja que capturemos la esencia salvaje de tu máquina
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={handleInstagramClick}
            className="group relative px-8 py-4 bg-gradient-to-r from-[#C62828] to-[#EB7A3F] text-white font-black tracking-widest text-sm hover:scale-105 transition-all duration-300 overflow-hidden cursor-pointer"
          >
            <span className="relative z-10">RESERVAR SESIÓN</span>
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300" />
          </button>
        </div>

        <p className="text-xs text-muted-foreground mt-8 tracking-widest">
          DISPONIBILIDAD LIMITADA • RESERVA CON ANTICIPACIÓN
        </p>
      </div>
    </section>
  )
}
