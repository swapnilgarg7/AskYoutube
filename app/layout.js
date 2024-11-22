export const metadata = {
  title: 'AskYoutube',
  description: 'Ask Questions to Youtube Videos',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
