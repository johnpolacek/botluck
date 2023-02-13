import React, { useState } from "react"
import { AppContext } from "./AppContext"
import { getThemes } from "../utils/Themes"
import { Dancing_Script } from "@next/font/google"

const dancingScript = Dancing_Script({ subsets: ["latin"] })

const ThemePicker: React.FC = () => {
  const themes = getThemes()
  const [themeIndex, setThemeIndex] = useState<number>(0)

  return (
    <AppContext.Consumer>
      {({ theme, setTheme }) => (
        <div className="my-4 items-center space-x-3 pt-8 max-w-lg mx-auto">
          <h3
            className={`text-4xl font-bold text-primary-700 w-full ${dancingScript.className}`}
          >
            Enter a theme
          </h3>
          <input
            name="theme"
            required
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="w-full rounded-md block border px-2 py-1 border-gray-300 shadow-sm focus:border-black focus:ring-black mt-4 mb-2 text-center"
            placeholder={
              "e.g. Mexican, Chinese, International Night, Surf & Turf, etc."
            }
          />
          <p>or</p>
          <button
            onClick={(e) => {
              e.preventDefault()
              setTheme(themes[themeIndex])
              setThemeIndex(themeIndex + 1)
            }}
            className="bg-primary-600 rounded-xl text-white font-medium px-6 py-2 mt-2"
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
