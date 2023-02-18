import React, { useState } from "react"
import { AppContext } from "./AppContext"
import { getThemes } from "../utils/Themes"
import Heading from "./ui/Heading"

const ThemePicker: React.FC = () => {
  const themes = getThemes()
  const [themeIndex, setThemeIndex] = useState<number>(0)

  return (
    <AppContext.Consumer>
      {({ theme, setTheme }) => (
        <div className="mt-4 sm:mt-0 sm:mb-4 items-center sm:space-x-3 max-w-lg mx-auto">
          <Heading>Enter a theme</Heading>
          <input
            name="theme"
            required
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="w-full text-white bg-transparent text-lg sm:text-3xl block border-double border-b-4 sm:border-b-[6px] p-2 pb-3 border-primary-800 focus:outline-none mb-2 text-center"
            placeholder={"e.g. International, Surf & Turf, etc."}
          />
          <p className="text-2xl text-primary-800">or</p>
          <button
            onClick={(e) => {
              e.preventDefault()
              setTheme(themes[themeIndex])
              setThemeIndex(themeIndex + 1)
            }}
            className="bg-transparent text-lg rounded-xl text-white font-medium px-6 py-2 mt-2"
            style={{
              boxShadow: "inset 0 0 90px rgba(149, 69, 53, 0.75)",
              textShadow: "0 0 2px rgb(0 0 0 / 80%)",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 relative -top-px -left-2 inline-block"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
            Get a Random Theme
          </button>
        </div>
      )}
    </AppContext.Consumer>
  )
}

export default ThemePicker
