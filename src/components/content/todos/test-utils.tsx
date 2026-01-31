import { Provider } from 'react-redux'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { render } from '@testing-library/react'
import todoReducer from '@/store/todoSlice'

const rootReducer = combineReducers({
  todo: todoReducer,
})

export function renderWithStore(ui: React.ReactElement, { preloadedState }: { preloadedState?: any } = {}) {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState,
  })

  return {
    store,
    ...render(<Provider store={store}>{ui}</Provider>),
  }
}
