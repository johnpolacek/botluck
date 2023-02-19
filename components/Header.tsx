import Image from "next/image"
import Link from "next/link"

export default function Header() {
  return (
    <header className="flex flex-col items-center w-full pt-4 sm:px-4 px-2 text-primary-600">
      <Link href="/" className="flex space-x-3 lg:pl-6 relative right-4">
        <Image
          alt="header text"
          src="/botluck.svg"
          className="w-10 h-10 sm:w-12 sm:h-12"
          width={18}
          height={18}
        />
        <h1 className={`text-4xl sm:text-5xl font-bold sm:ml-2 text-dark`}>
          <span className="pr-1">Bot</span>
          <span className="pl-px pr-px">Luck</span>
        </h1>
      </Link>
      <p className="pt-1 pr-8 sm:text-xl font-bold relative left-2 sm:left-6 text-[rgba(0,0,0,.5)]">
        Created by{" "}
        <a className="text-blue-700" href="https://twitter.com/johnpolacek">
          @johnpolacek
        </a>
      </p>
    </header>
  )
}
