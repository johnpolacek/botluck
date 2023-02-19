const Card = ({
  children,
  className,
}: {
  children: JSX.Element | JSX.Element[]
  className?: string
}) => (
  <div
    className={`${
      className ? className : "w-full sm:w-[640px]"
    } sm:px-4 mb-4 sm:mb-8`}
  >
    <div
      className="flex flex-col justify-start rounded-lg p-6 mb-6 h-full"
      style={{ boxShadow: "inset 0 0 90px rgba(149, 69, 53, .33)" }}
    >
      {children}
    </div>
  </div>
)

export default Card
