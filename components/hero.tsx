 import Image from 'next/image'
 
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
              className="object-cover filter saturate-20 contrast-110 brightness-50"
              sizes="50vw"
              priority
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
              src="/motorcycle-street-photography-urban-speed.jpg"
              alt="Motorcycle street photography"
              fill
              className="object-cover filter saturate-20 contrast-110 brightness-50"
              sizes="50vw"
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

      <div className="relative z-10 text-center space-y-6 px-6">
        <h1 className="text-grain-white text-7xl md:text-9xl font-black tracking-tighter leading-none text-zinc-50">DARK FRAME</h1>
        <h1 className="text-7xl md:text-9xl font-black tracking-tighter leading-none text-[#EB7A3F]">MOTORS</h1>
        <p className="text-lg md:text-2xl text-gray-200 tracking-wide max-w-2xl mx-auto font-bold">
          CAPTURAMOS LA ESENCIA SALVAJE DEL ASFALTO
        </p>
      </div>
    </section>
  )
}
