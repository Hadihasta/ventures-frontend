import TodoCard from '@/components/content/todos/TodoCard'

export interface  Todo{
  id: number
  title: string
  completed: boolean
}

export type Filter = 'all' | 'completed' | 'pending'

export default function TodosPage() {
 
  return (
    <div className="min-h-screen bg-[#f5f9ff] flex items-center justify-center px-6">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-xl p-8 border border-blue-100">
        <h1 className="text-3xl font-bold text-blue-700 mb-6">
          Todo App
        </h1>
      <TodoCard/>
     
      </div>
    </div>
  )
}
