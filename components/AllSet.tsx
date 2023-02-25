import React, { useEffect, useRef, useState } from "react"
import Link from "next/link"

const AllSet = ({ id }: { id: string }) => {
  const [isCopied, setIsCopied] = useState<boolean>(false)

  // Scroll to top of the page when this element is rendered
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }, [])

  const inputRef = useRef<HTMLInputElement>(null)

  function handleInputClick() {
    if (inputRef.current) {
      inputRef.current.select()
      navigator.clipboard.writeText(inputRef.current.value)
      setIsCopied(true)
    }
  }

  return (
    <div
      className="inline-block border-8 border-double border-primary-500 py-8 px-12 text-primary-800 mb-4"
      style={{
        boxShadow: "rgba(149, 69, 53, 0.2) 0px 0px 90px inset",
      }}
    >
      <h3 className="text-2xl sm:text-4xl pb-2">You’re All Set</h3>
      <p className="text-lg pb-4">
        The robots have finished cooking up your potluck meal plan.
      </p>
      <p className="text-xl text-white pb-2">~ Copy and share this link ~</p>
      <input
        className="px-4 py-1 bg-primary-100 rounded-lg border-2 w-full max-w-sm text-center text-lg cursor-pointer"
        readOnly
        ref={inputRef}
        onClick={handleInputClick}
        value={`https://botluck.fun/recipes/${id}`}
      />
      <p
        className={`mt-px mb-2 text-primary-900 ${isCopied ? "opacity-100" : "opacity-0"
          }`}
      >
        <span className="relative top-[2px] left-px">✓</span> copied
      </p>
      <Link
        className="inline-block mt-2 rounded px-8 pt-1 pb-2 bg-primary-500 text-white text-xl"
        href={`/recipes/${id}`}
      >
        go to recipe page
      </Link>
    </div>
  )
}

export default AllSet
