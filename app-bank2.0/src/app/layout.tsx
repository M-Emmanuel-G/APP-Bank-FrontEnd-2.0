import './globals.css'

export const metadata = {
  title: 'AppBank',
  description: 'AppBank',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
