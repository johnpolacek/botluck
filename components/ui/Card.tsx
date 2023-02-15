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
    <div className="flex flex-col justify-start bg-white shadow rounded-lg p-6 mb-6 h-full">
      {children}
    </div>
  </div>
)

export default Card
