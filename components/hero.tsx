 import Image from 'next/image'
 import { distillery, moontime } from '@/app/fonts'
 
 export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 grid grid-cols-2">
          {/* Left Image */}
          <div className="relative h-full overflow-hidden">
            <Image
              src="/aston-martin.jpg"
              alt="Dark street car photography"
              fill
              className="object-cover filter saturate-0 contrast-110 brightness-50"
              sizes="50vw"
              priority
              quality={90}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/25 via-black/10 to-transparent"></div>
            <div
              className="pointer-events-none absolute inset-0 opacity-10 mix-blend-overlay"
              style={{
                backgroundImage:
                  'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'><filter id=\'n\'><feTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'4\' stitchTiles=\'stitch\'/></filter><rect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/></svg>")',
                backgroundSize: '200px 200px',
                backgroundRepeat: 'repeat',
              }}
            ></div>
            {/* <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-background/40 to-transparent"></div> */}
          </div>

          {/* Right Image */}
          <div className="relative h-full overflow-hidden">
            <Image
              src="/moto-speed.jpg"
              alt="Motorcycle street photography"
              fill
              className="object-cover filter saturate-0 contrast-110 brightness-40"
              sizes="50vw"
              priority
              quality={90}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-l from-black/25 via-black/10 to-transparent"></div>
            <div
              className="pointer-events-none absolute inset-0 opacity-10 mix-blend-overlay"
              style={{
                backgroundImage:
                  'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'><filter id=\'n\'><feTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'4\' stitchTiles=\'stitch\'/></filter><rect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/></svg>")',
                backgroundSize: '200px 200px',
                backgroundRepeat: 'repeat',
              }}
            ></div>
            {/* <div className="absolute inset-0 bg-gradient-to-l from-background/60 via-background/40 to-transparent"></div> */}
          </div>
        </div>
      </div>

      <div className="relative z-10 text-center space-y-1 px-6">
        <h1 className="text-7xl md:text-9xl tracking-tighter leading-none text-zinc-50">
          <span className={distillery.className}>DARK FRAME</span>
        </h1>
        <h1 className="text-7xl md:text-[10rem] tracking-tighter leading-none -mt-4 bg-gradient-to-r from-[#C62828] to-[#EB7A3F] bg-clip-text text-transparent">
          <span className={moontime.className}>Motors</span>
        </h1>
        <p className="text-lg md:text-2xl text-gray-200 tracking-wide max-w-2xl mx-auto font-bold">
          CAPTURANDO LA ESCENCIA SALVAJE DEL ASFALTO
        </p>
      </div>
    </section>
  )
}
