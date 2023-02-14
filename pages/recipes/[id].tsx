import { GetServerSideProps, NextPage } from "next"
import Head from "next/head"
import Header from "../../components/Header"
import App from "../../components/App"
import Footer from "../../components/Footer"
import { useRouter } from "next/router"
import { AppContextProvider } from "../../components/AppContext"
import { getPotLuck } from "../../lib/firebase/admin"
import { PotLuckData } from "../../components/Types"

type Props = { data: { created: string; data: PotLuckData } }

const Recipe: NextPage<Props> = ({ data }) => {
  const router = useRouter()
  const { id } = router.query

  console.log({ data })

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Head>
        <title>BotLuck - Group Pot Luck Dinner Generator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <AppContextProvider>
        <div className="flex-grow flex flex-col items-center justify-center">
          <div>{id}</div>
          <div>{JSON.stringify(data, null, 2)}</div>
        </div>
      </AppContextProvider>
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
