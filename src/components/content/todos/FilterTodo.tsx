import React from 'react'
import { Filter } from '@/app/todos/page'
import {  setFilter } from '@/store/todoSlice'
import type { RootState, AppDispatch } from '@/store'
import { useDispatch, useSelector } from 'react-redux'

const FilterTodo = () => {

      const {  filter } = useSelector((state: RootState) => state.todo)
  const dispatch = useDispatch<AppDispatch>()
  return (
    <>
        <div className="flex gap-2 mb-6">
        {(['all', 'completed', 'pending'] as Filter[]).map((item) => (
          <button
            key={item}
            onClick={() => dispatch(setFilter(item))}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition
              ${filter === item ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'}`}
          >
            {item.toUpperCase()}
          </button>
        ))}
      </div>
    </>
  )
}

export default FilterTodo