import Image from "next/image"
import Link from "next/link"
import { Dancing_Script } from "@next/font/google"

const dancingScript = Dancing_Script({ subsets: ["latin"] })

export default function Header() {
  return (
    <header
      className={`flex flex-col items-center w-full py-6 sm:px-4 px-2 text-primary-600 ${dancingScript.className}`}
    >
      <Link href="/" className="flex space-x-3 lg:pl-6 relative right-4">
        <Image
          alt="header text"
          src="/botluck.svg"
          className="w-10 h-10"
          width={18}
          height={18}
        />
        <h1 className={`text-4xl font-bold ml-2 text-[#3e4347]`}>
          <span className="pr-1">Bot</span>
          <span className="pl-px pr-px">Luck</span>
          <span>.fun</span>
        </h1>
      </Link>
      <p className="pr-8 text-xl font-bold relative left-6 pt-1 text-gray-600">
        Created by{" "}
        <a className="text-blue-700" href="https://twitter.com/johnpolacek">
          @johnpolacek
        </a>
      </p>
    </header>
  )
}
