'use client'

const TodoSkeleton = ({ leaving = false }: { leaving?: boolean }) => {
  return (
    <li
      className={`
        flex items-center gap-3 p-4 rounded-xl border border-blue-100
        bg-blue-50
        animate-pulse
        transition-all duration-500
        ${leaving ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}
      `}
    >
      <div className="w-5 h-5 rounded-full bg-blue-200" />
      <div className="flex-1 h-4 rounded bg-blue-200" />
      <div className="w-4 h-4 rounded bg-blue-200" />
    </li>
  )
}

export default TodoSkeleton