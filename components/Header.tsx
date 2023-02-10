import Image from "next/image";
import Link from "next/link";
import { Dancing_Script } from '@next/font/google';

const dancingScript = Dancing_Script({ subsets: ['latin'] });

export default function Header() {

  return (
    <header className={`flex flex-col items-center w-full pt-3 border-b-2 border-primary-50 pb-5 sm:px-4 px-2 text-primary-600 ${dancingScript.className}`}>
      <Link href="/" className="flex space-x-3 lg:pl-6 relative right-4">
        <Image
          alt="header text"
          src="/botluck.svg"
          className="sm:w-12 sm:h-12 w-8 h-8"
          width={32}
          height={32}
        />
        <h1 className={`text-5xl font-bold ml-2`}>
          <span className="pr-1">Bot</span><span className="pl-px pr-px">Luck</span><span>.fun</span>
        </h1>
      </Link>
      <p className="pr-8 text-xl font-bold relative left-6 pt-1 text-gray-500">Created by <a className="text-blue-600" href="https://twitter.com/johnpolacek">@johnpolacek</a></p>
    </header>
  );
}
