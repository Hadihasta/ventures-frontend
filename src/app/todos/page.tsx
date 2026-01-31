import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import TodoCard from '@/components/content/todos/TodoCard'

export interface Todo {
  id: number
  title: string
  completed: boolean
}

export type Filter = 'all' | 'completed' | 'pending'

export default function TodosPage() {
  return (
    <div className="min-h-screen bg-[#f5f9ff] flex items-center justify-center px-6">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-xl p-8 border border-blue-100">
        

        <div className="flex items-center gap-3 mb-6">
          <Link
            href="/"
            className="p-2 rounded-xl hover:bg-blue-100 transition"
            aria-label="Back"
          >
            <ArrowLeft className="text-blue-600" />
          </Link>

          <h1 className="text-3xl font-bold text-blue-700">
            Todo App
          </h1>
        </div>

        <TodoCard />
      </div>
    </div>
  )
}
