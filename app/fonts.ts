import localFont from 'next/font/local'

export const distillery = localFont({
  src: [
    {
      path: '../public/fonts/Distillery Strong.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
  display: 'swap',
  preload: true,
})

export const moontime = localFont({
  src: [
    {
      path: '../public/fonts/MoonTime-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
  display: 'swap',
  preload: true,
})
