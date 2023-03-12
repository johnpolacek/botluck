import Image from "next/image"

interface Product {
  name: string
  link: string
  img: string
}

const Product = ({ name, link, img }: Product) => (
  <a className="flex flex-col items-center" href={link}>
    <Image
      className="block mb-2 border-8 border-primary-400 rounded-xl overflow-hidden"
      alt=""
      src={`/img/product/${img}`}
      width={240}
      height={240}
    />
    <span className="block max-w-[240px] text-primary-700 font-bold pb-2">
      {name}
    </span>
    <button className="bg-primary-500 sm:text-lg text-primary-100 rounded-lg px-4 pb-[3px]">
      shop on target
    </button>
  </a>
)

export default Product
