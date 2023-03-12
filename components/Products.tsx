import React from "react"
import Separator from "./ui/Separator"
import Heading from "./ui/Heading"
import Product from "./Product"

const Products = () => {
  return (
    <div className="pb-16 text-center">
      <Separator />
      <Heading>Product Recommendations</Heading>
      <div className="flex flex-col md:flex-row gap-8 justify-between pt-4 max-w-4xl mx-auto">
        <Product
          name="Starfrit Cast Iron Skillet"
          link="https://howl.me/cjjgtF0eWKU"
          img="skillet.jpeg"
        />
        <Product
          name="Ninja NeverDull Knife System"
          link="https://howl.me/cjjgWK0TCg6"
          img="cutlery.jpeg"
        />
        <Product
          name="PowerXL Vortex Pro Air Fryer"
          link="https://howl.me/cjjgYMOVX1A"
          img="air-fryer.jpeg"
        />
        <Product
          name="Ninja Foodi Smoothie Maker"
          link="https://howl.me/cjjg1eG6tA9"
          img="smoothie.jpeg"
        />
      </div>
    </div>
  )
}

export default Products
