'use client'

import { Plus, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import type { AppDispatch } from '@/store'
import { addTodo } from '@/store/todoSlice'
import { useDebounce } from '@/app/hooks/useDebounce'


type InputTodoProps = {
  onStartAdd: () => void
}


const InputTodo = ({ onStartAdd }: InputTodoProps) => {
  const [title, setTitle] = useState('')
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch<AppDispatch>()

  const debouncedTitle = useDebounce(title, 300)

  const handleAdd = () => {
    if (!debouncedTitle.trim()) return

    setLoading(true)

    onStartAdd()
    setTimeout(() => {
      dispatch(addTodo(debouncedTitle))
      setTitle('')
      setLoading(false)
    }, 500)
  }

  return (
    <div className="flex gap-3 mb-6">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add new task..."
        className="flex-1 px-4 py-3 rounded-xl border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
      />

      <button
        onClick={handleAdd}
        disabled={loading}
        className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 transition disabled:opacity-70"
      >
        {loading ? <Loader2 className="animate-spin" size={20} /> : <Plus size={20} />}
      </button>
    </div>
  )
}

export default InputTodo
