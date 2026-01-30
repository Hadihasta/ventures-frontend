'use client'
import {
  Plus,
  Trash2,
  CheckCircle2,
  Circle,
} from 'lucide-react'
import { useEffect, useState } from 'react'

import { Todo } from '@/app/todos/page'
import { Filter } from '@/app/todos/page'
import { dummyTodos } from '@/data/todo'

const TodoCard = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [title, setTitle] = useState('')
  const [filter, setFilter] = useState<Filter>('all')



  useEffect(() => {
  const stored = localStorage.getItem('todos')

  if (stored) {
    setTodos(JSON.parse(stored))
    // kalau udah ada di local storage gk usah di restore lagi
  } else {
    localStorage.setItem('todos', JSON.stringify(dummyTodos))
    setTodos(dummyTodos)
    // kalau belum ada dummy data masukan ke local 
  }
}, [])

  const addTodo = () => {
    if (!title.trim()) return

    setTodos([
      ...todos,
      {
        id: Date.now(),
        title,
        completed: false,
      },
    ])
    setTitle('')
  }

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id
        ? { ...todo, completed: !todo.completed }
        : todo
    ))
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const filteredTodos = todos.filter(todo => {
    if (filter === 'completed') return todo.completed
    if (filter === 'pending') return !todo.completed
    return true
  })


  return (
 <>
    {/* Input */}
        <div className="flex gap-3 mb-6">
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Add new task..."
            className="flex-1 px-4 py-3 rounded-xl border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <button
            onClick={addTodo}
            className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 transition"
          >
            <Plus size={20} />
          </button>
        </div>

        {/* Filter */}
        <div className="flex gap-2 mb-6">
          {(['all', 'completed', 'pending'] as Filter[]).map(item => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition
                ${
                  filter === item
                    ? 'bg-blue-600 text-white'
                    : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                }`}
            >
              {item.toUpperCase()}
            </button>
          ))}
        </div>

        {/* List */}
        <ul className="space-y-3">
          {filteredTodos.map(todo => (
            <li
              key={todo.id}
              className="flex items-center gap-3 p-4 rounded-xl border border-blue-100 hover:bg-blue-50 transition"
            >
              <button onClick={() => toggleTodo(todo.id)}>
                {todo.completed ? (
                  <CheckCircle2 className="text-blue-600" />
                ) : (
                  <Circle className="text-gray-400" />
                )}
              </button>

              <span
                className={`flex-1 ${
                  todo.completed
                    ? 'line-through text-gray-400'
                    : 'text-gray-700'
                }`}
              >
                {todo.title}
              </span>

              <button
                onClick={() => deleteTodo(todo.id)}
                className="text-red-400 hover:text-red-600 transition"
              >
                <Trash2 size={18} />
              </button>
            </li>
          ))}
        </ul>

        {filteredTodos.length === 0 && (
          <p className="text-center text-gray-400 mt-8">
            No tasks found ✨
          </p>
        )}
        </>
  )
}

export default TodoCard