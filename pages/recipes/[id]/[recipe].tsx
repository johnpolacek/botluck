import { GetServerSideProps, NextPage } from "next"
import Script from "next/script"
import Head from "next/head"
import Header from "../../../components/Header"
import Footer from "../../../components/Footer"
import { getPotLuck } from "../../../lib/firebase/admin"
import { Courses, PotLuckData } from "../../../components/Types"
import Dish from "../../../components/Dish"

type Props = { dish: Dish }

const Recipe: NextPage<Props> = ({ dish }) => {
  const recipeEmbed = {
    __html: `{"@context":"https://schema.org/","@type":"Recipe","Name":"${
      dish.name
    }","author":"Botluck","recipeIngredient":${JSON.stringify(
      dish.ingredients
    )}}`,
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Head>
        <title>BotLuck - {dish.name}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="text-center py-8">
        <Dish dish={dish} />
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
      <script
        id="recipe-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={recipeEmbed}
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

  const { id, recipe } = query
  const data = id ? await getPotLuck(id as string) : null

  let dish = null

  const recipeIndex = recipe ? parseInt(recipe.toString()) : 0

  if (data) {
    const courseNames = ["Appetizers", "Main Course", "Side Dishes", "Dessert"]
    let index = 0
    courseNames.every((course) => {
      data.data.courses[course as keyof Courses].every((dishData: Dish) => {
        if (index === recipeIndex) {
          dish = dishData
          return false
        }
        index++
      })
    })
  }

  return { props: { dish } }
}

export default Recipe
