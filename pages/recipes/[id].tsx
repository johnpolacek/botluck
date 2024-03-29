import { GetServerSideProps, NextPage } from "next"
import Script from "next/script"
import Head from "next/head"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import Link from "next/link"
import { getPotLuck } from "../../lib/firebase/admin"
import { Courses, PotLuckData } from "../../components/Types"
import Products from "../../components/Products"
import RecipeDetail from "../../components/RecipeDetail"

type Props = { data: { created: string; data: PotLuckData } }

const Recipe: NextPage<Props> = ({ data }) => {
  const recipeName = data.data.theme
  const ingredients: string[] = []
  Object.keys(data.data.courses).forEach((course) => {
    data.data.courses[course as keyof Courses].forEach((dish) => {
      ingredients.concat(dish.ingredients)
    })
  })

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Head>
        <title>BotLuck - {data.data.theme}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Link href="/" className="text-lg text-white px-6 py-2 bg-primary-500 mt-4 rounded-xl">Generate Your Own BotLuck</Link>
      <RecipeDetail potLuckData={data.data} />
      <div className="-mt-8">
        <Products />
      </div>
      <Footer />
      <Script
        id="instacart-script"
        dangerouslySetInnerHTML={{
          __html: `(function (d, s, id, a) { var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) { return; } js = d.createElement(s); js.id = id;
        js.src = "https://widgets.instacart.com/widget-bundle-v2.js"; js.async = true;
    js.dataset.source_origin = "affiliate_hub"; fjs.parentNode.insertBefore(js, fjs); })
        (document, "script", "standard-instacart-widget-v1");`,
        }}
      />
      <Script
        id="recipe-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: `{
          "@context": "https://schema.org/",
          "@type": "Recipe",
          "name": "${recipeName}",
          "author": "BotLuck",
          "recipeIngredient": ${JSON.stringify(ingredients)},
          "description": "Pot luck theme generated by AI",
        }`,
        }}
      />
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
