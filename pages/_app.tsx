import { Analytics } from "@vercel/analytics/react"
import type { AppProps } from "next/app"
import "../styles/globals.css"
import { Dancing_Script } from "@next/font/google"

const dancingScript = Dancing_Script({ subsets: ["latin"] })

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={dancingScript.className}>
      <Component {...pageProps} />
      <Analytics />
    </div>
  )
}

export default MyApp
