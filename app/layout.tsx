import React from 'react';
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Helika Next.js SDK Example',
}

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: any
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}