import './globals.css'
import { PropsWithChildren } from 'react'

export const metadata = {
  title: 'PayNexus',
  description: 'Unified Payment Aggregator - Demo'
}

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        {children}
      </body>
    </html>
  )
}
