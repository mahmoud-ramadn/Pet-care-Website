interface CounterProps {
  count?: number
  increase?: () => void
  decrease?: () => void
  min?: number // Optional minimum value
  max?: number // Optional maximum value
}

export default function Counter({ count, increase, decrease, min, max }: CounterProps) {
  const isMinReached = min !== undefined && count <= min
  const isMaxReached = max !== undefined && count >= max

  return (
    <div className="flex items-center gap-2">
      {/* Decrease Button */}
      <button
        onClick={decrease}
        disabled={isMinReached}
        className={`
          flex items-center justify-center
          w-8 h-8 rounded-full
          ${isMinReached ? "bg-gray-200 cursor-not-allowed text-gray-400" : "bg-blue-500 hover:bg-blue-600 text-white"}
          transition-colors duration-200
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
        `}
      >
        -
      </button>

      {/* Count Display */}
      <span className="text-lg font-medium w-8 text-center">{count}</span>

      {/* Increase Button */}
      <button
        onClick={increase}
        disabled={isMaxReached}
        className={`
          flex items-center justify-center
          w-8 h-8 rounded-full
          ${isMaxReached ? "bg-gray-200 cursor-not-allowed text-gray-400" : "bg-blue-500 hover:bg-blue-600 text-white"}
          transition-colors duration-200
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
        `}
      >
        +
      </button>
    </div>
  )
}
