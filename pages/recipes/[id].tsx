import { GetServerSideProps, NextPage } from "next"
import Head from "next/head"
import Link from "next/link"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import { getPotLuck } from "../../lib/firebase/admin"
import { PotLuckData } from "../../components/Types"
import MealPlan from "../../components/MealPlan"
import Recent from "../../components/Recent"
import { Dancing_Script } from "@next/font/google"

const dancingScript = Dancing_Script({ subsets: ["latin"] })

type Props = { data: { created: string; data: PotLuckData } }

const Recipe: NextPage<Props> = ({ data }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Head>
        <title>BotLuck - Group Pot Luck Dinner Generator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center py-12">
        <div className="flex-grow flex flex-col items-center justify-center">
          {data ? (
            <MealPlan potLuckData={data.data}></MealPlan>
          ) : (
            <div>Recipe not found</div>
          )}
        </div>
        <Link
          className={`text-3xl text-blue-600 pb-4 mb-16 ${dancingScript.className}`}
          href="/"
        >
          Generate your own
        </Link>
        <Recent />
      </main>
      <Footer />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  query,
}) => {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=100000, stale-while-revalidate=1000000"
  )

  const { id } = query
  const data = id ? await getPotLuck(id as string) : null

  return { props: { data } }
}

export default Recipe
