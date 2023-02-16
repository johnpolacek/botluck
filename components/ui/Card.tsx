const Card = ({
  children,
  className,
}: {
  children: JSX.Element | JSX.Element[]
  className?: string
}) => (
  <div
    className={`${className ? className : "w-[640px]"} max-w-full px-4 mb-8`}
  >
    <div
      className="flex flex-col justify-start rounded-lg p-6 mb-6 h-full"
      style={{ boxShadow: "inset 0 0 160px rgba(149, 69, 53, .25)" }}
    >
      {children}
    </div>
  </div>
)

export default Card
