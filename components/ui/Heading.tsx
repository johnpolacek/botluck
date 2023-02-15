import { Dancing_Script } from "@next/font/google"

const dancingScript = Dancing_Script({ subsets: ["latin"] })

const Heading = ({
  children,
}: {
  children: JSX.Element | JSX.Element[] | string
}) => (
  <h3
    className={`text-4xl font-bold w-full pb-4 text-primary-700 ${dancingScript.className}`}
  >
    {children}
  </h3>
)

export default Heading
