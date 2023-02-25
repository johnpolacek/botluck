import Separator from "./ui/Separator"

export default function Footer() {
  return (
    <footer
      className={`flex flex-col text-xl px-4 text-primary-700 justify-center items-center gap-2 text-center pb-16 w-full`}
    >
      <Separator />
      <h1 className="text-4xl sm:text-6xl font-bold text-dark mx-auto">
        Pot Luck Dinners
      </h1>
      <h1 className="text-lg sm:text-xl font-bold text-dark mx-auto tracking-wider mx-auto -mt-2 mb-6">
        ~ powered by robots ~
      </h1>
      <div className="text-xl text-[rgba(0,0,0,0.5)]">
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
      <div className="text-xl text-[rgba(0,0,0,0.5)]">
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
      <div className="pt-4 text-xl text-[rgba(0,0,0,0.5)]">
        Inspired by{" "}
        <a
          href="https://vercel.com/blog/gpt-3-app-next-js-vercel-edge-functions"
          target="_blank"
          rel="noreferrer"
          className="font-bold hover:underline transition underline-offset-2 text-blue-700"
        >
          this blog post
        </a>{" "}
        by{" "}
        <a
          href="https://www.elmghari.com/"
          target="_blank"
          rel="noreferrer"
          className="font-bold hover:underline transition underline-offset-2 text-blue-700"
        >
          Hassan El Mghari
        </a>{" "}
        and{" "}
        <a
          href="https://twitter.com/seanlinehan/status/1620159578653720577"
          target="_blank"
          rel="noreferrer"
          className="font-bold hover:underline transition underline-offset-2 text-blue-700"
        >
          this tweet
        </a>
      </div>
      <div className="text-xl text-[rgba(0,0,0,0.5)] pt-4">
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
      <div className="text-xl text-[rgba(0,0,0,0.5)]">
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
      <div className="text-xl text-[rgba(0,0,0,0.5)] pt-4">
        Background from{" "}
        <a
          href="https://www.transparenttextures.com/"
          target="_blank"
          rel="noreferrer"
          className="font-bold hover:underline transition underline-offset-2 text-blue-700"
        >
          transparenttextures.com{" "}
        </a>
      </div>
      <div className="text-xl text-[rgba(0,0,0,0.5)] pt-4">
        Dancing Script font by{" "}
        <a
          href="https://github.com/impallari"
          target="_blank"
          rel="noreferrer"
          className="font-bold hover:underline transition underline-offset-2 text-blue-700"
        >
          Pablo Impallari{" "}
        </a>
      </div>
    </footer>
  )
}
