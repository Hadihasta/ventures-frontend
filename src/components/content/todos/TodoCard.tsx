'use client'
import { Trash2, CheckCircle2, Circle } from 'lucide-react'
import { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '@/store'

import { toggleTodo, deleteTodo, setTodos } from '@/store/todoSlice'

import InputTodo from './InputTodo'
import FilterTodo from './FilterTodo'
import TodoSkeleton from './TodoSkeleton'

const TodoCard = () => {
   const [showSkeleton, setShowSkeleton] = useState(false)
  const [leavingSkeleton, setLeavingSkeleton] = useState(false)
  const { todos, filter } = useSelector((state: RootState) => state.todo)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    const stored = localStorage.getItem('todos')
    if (stored) {
      dispatch(setTodos(JSON.parse(stored)))
    }
  }, [dispatch])

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))

    if (showSkeleton) {
      const timeout = setTimeout(() => {
        setLeavingSkeleton(true)

        setTimeout(() => {
          setShowSkeleton(false)
          setLeavingSkeleton(false)
        }, 200)
      }, 200)

      return () => clearTimeout(timeout)
    }
  }, [todos, showSkeleton])


  const handleToggleTodo = (id: number) => {
    dispatch(toggleTodo(id))
  }

  const handleDeleteTodo = (id: number) => {
    dispatch(deleteTodo(id))
  }

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'completed') return todo.completed
    if (filter === 'pending') return !todo.completed
    return true
  })

  return (
    <>
      <InputTodo onStartAdd={() => setShowSkeleton(true)} />

      <FilterTodo />

      <ul className="space-y-3">
  
        {filteredTodos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center gap-3 p-4 rounded-xl border border-blue-100 hover:bg-blue-50 transition"
          >
            <button onClick={() => handleToggleTodo(todo.id)}>
              {todo.completed ? <CheckCircle2 className="text-blue-600" /> : <Circle className="text-gray-400" />}
            </button>

            <span className={`flex-1 ${todo.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
              {todo.title}
            </span>

            <button
              onClick={() => handleDeleteTodo(todo.id)}
              className="text-red-400 hover:text-red-600 transition"
            >
              <Trash2 size={18} />
            </button>
          </li>
        ))}
     {showSkeleton && <TodoSkeleton leaving={leavingSkeleton} />}
      </ul>

      {filteredTodos.length === 0 && <p className="text-center text-gray-400 mt-8">No tasks found ✨</p>}
    </>
  )
}

export default TodoCard
