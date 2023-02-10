import { Dancing_Script } from "@next/font/google"
const dancingScript = Dancing_Script({ subsets: ["latin"] })

const LoadingAnimation = () => {
  return (
    <div className="my-16">
      <div className="w-full h-32 relative flex justify-center">
        <svg
          className="h-full"
          role="img"
          version="1.1"
          id="L2"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 100 100"
          enable-background="new 0 0 100 100"
          xmlSpace="preserve"
        >
          <title>Loading</title>
          <circle
            fill="none"
            stroke="#D98368"
            stroke-width="4"
            stroke-miterlimit="10"
            cx="50"
            cy="50"
            r="48"
          />
          <line
            fill="none"
            stroke-linecap="round"
            stroke="#D98368"
            stroke-width="4"
            stroke-miterlimit="10"
            x1="50"
            y1="50"
            x2="85"
            y2="50.5"
          >
            <animateTransform
              attributeName="transform"
              dur="2s"
              type="rotate"
              from="0 50 50"
              to="360 50 50"
              repeatCount="indefinite"
            />
          </line>
          <line
            fill="none"
            stroke-linecap="round"
            stroke="#D98368"
            stroke-width="4"
            stroke-miterlimit="10"
            x1="50"
            y1="50"
            x2="49.5"
            y2="74"
          >
            <animateTransform
              attributeName="transform"
              dur="15s"
              type="rotate"
              from="0 50 50"
              to="360 50 50"
              repeatCount="indefinite"
            />
          </line>
        </svg>
      </div>
      <div
        className={`w-full italic text-3xl py-6 text-primary-500 ${dancingScript.className}`}
      >
        Cooking up your meal plan...
      </div>
    </div>
  )
}

export default LoadingAnimation
