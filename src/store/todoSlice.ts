import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { dummyTodos } from '@/data/todo'

export type Todo = {
  id: number
  title: string
  completed: boolean
}

type Filter = 'all' | 'completed' | 'pending'

type TodoState = {
  todos: Todo[]
  filter: Filter
}

const initialState: TodoState = {
  todos: dummyTodos,
  filter: 'all',
}

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    setTodos(state, action: PayloadAction<Todo[]>) {
      state.todos = action.payload
    },

    addTodo(state, action: PayloadAction<string>) {
      state.todos.push({
        id: Date.now(),
        title: action.payload,
        completed: false,
      })
    },

    toggleTodo(state, action: PayloadAction<number>) {
      const todo = state.todos.find(t => t.id === action.payload)
      if (todo) todo.completed = !todo.completed
    },

    deleteTodo(state, action: PayloadAction<number>) {
      state.todos = state.todos.filter(t => t.id !== action.payload)
    },

    setFilter(state, action: PayloadAction<Filter>) {
      state.filter = action.payload
    },
  },
})

export const {
  setTodos,
  addTodo,
  toggleTodo,
  deleteTodo,
  setFilter,
} = todoSlice.actions

export default todoSlice.reducer
