import Separator from "./ui/Separator"

export default function Footer() {
  return (
    <footer
      className={`flex flex-col text-xl px-4 text-primary-700 justify-center items-center gap-2 text-center pb-16 w-full`}
    >
      <Separator />
      <h1 className="text-4xl sm:text-6xl font-bold text-primary-800 mx-auto mix-blend-hard-light">
        Pot Luck Dinners
      </h1>
      <h1 className="text-lg sm:text-xl font-bold text-primary-800 mx-auto mix-blend-hard-light tracking-wider mx-auto -mt-2 mb-6">
        ~ powered by robots ~
      </h1>
      <div className="font-sans text-sm">
        Built by{" "}
        <a
          href="https://johnpolacek.com/"
          target="_blank"
          rel="noreferrer"
          className="font-bold hover:underline transition underline-offset-2 text-blue-700"
        >
          John Polacek
        </a>
      </div>
      <div className="font-sans text-sm">
        You can follow me at{" "}
        <a
          href="https://twitter.com/johnpolacek"
          target="_blank"
          rel="noreferrer"
          className="font-bold hover:underline transition underline-offset-2 text-blue-700"
        >
          @johnpolacek
        </a>
      </div>
      <div className="font-sans text-sm pt-4">
        Powered by{" "}
        <a
          href="https://openai.com/"
          target="_blank"
          rel="noreferrer"
          className="font-bold hover:underline transition underline-offset-2 text-blue-700"
        >
          OpenAI{" "}
        </a>
      </div>
      <div className="font-sans text-sm">
        and{" "}
        <a
          href="https://vercel.com/"
          target="_blank"
          rel="noreferrer"
          className="font-bold hover:underline transition underline-offset-2 text-blue-700"
        >
          Vercel Edge Functions.
        </a>
      </div>
    </footer>
  )
}
