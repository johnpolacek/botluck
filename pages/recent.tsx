import type { NextPage } from "next"
import Head from "next/head"
import Header from "../components/Header"
import Recent from "../components/Recent"
import Footer from "../components/Footer"

const Home: NextPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Head>
        <title>BotLuck - Group Pot Luck Dinner Generator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="pt-8">
        <Recent loadMore={true} />
      </div>
      <Footer />
    </div>
  )
}

export default Home
