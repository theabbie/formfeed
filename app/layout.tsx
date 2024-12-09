export const metadata = {
  title: 'FormFeed: Form Builder',
  description: 'Form Builder for Job Applications',
}

import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
