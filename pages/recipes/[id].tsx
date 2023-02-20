import { GetServerSideProps, NextPage } from "next"
import Script from 'next/script'
import Head from "next/head"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import { getPotLuck } from "../../lib/firebase/admin"
import { PotLuckData } from "../../components/Types"
import RecipeDetail from "../../components/RecipeDetail"

type Props = { data: { created: string; data: PotLuckData } }

const Recipe: NextPage<Props> = ({ data }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Head>
        <title>BotLuck - Group Pot Luck Dinner Generator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <RecipeDetail potLuckData={data.data} />
      <Footer />
      <Script id="instacart-script" dangerouslySetInnerHTML={{
        __html: `(function (d, s, id, a) { var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) { return; } js = d.createElement(s); js.id = id;
        js.src = "https://widgets.instacart.com/widget-bundle-v2.js"; js.async = true;
    js.dataset.source_origin = "affiliate_hub"; fjs.parentNode.insertBefore(js, fjs); })
        (document, "script", "standard-instacart-widget-v1");`,
      }} />
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
