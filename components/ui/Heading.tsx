import type React from "react"

const Heading = ({ children }: { children: React.ReactNode }) => (
  <h3
    className={`text-2xl sm:text-3xl font-bold w-full sm:pb-3 text-primary-700`}
  >
    {children}
  </h3>
)

export default Heading
