import { screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TodoCard from './TodoCard'
import { renderWithStore } from './test-utils'

describe('TodoCard', () => {
  describe('Add Todo', () => {
    beforeEach(() => {
      jest.useFakeTimers()
    })

    afterEach(() => {
      jest.runOnlyPendingTimers()
      jest.useRealTimers()
    })

   it('adds todo when input filled and add button clicked', async () => {
  jest.useFakeTimers()

  const user = userEvent.setup({
    advanceTimers: jest.advanceTimersByTime,
  })

  renderWithStore(<TodoCard />)

  const input = screen.getByPlaceholderText('Add new task...')
  const addButton = screen.getByRole('button', { name: /add todo/i })

  await user.type(input, 'Learn Testing')
  await user.click(addButton)


  act(() => {
    jest.advanceTimersByTime(800)
  })

  expect(await screen.findByText('Learn Testing')).toBeInTheDocument()

  jest.useRealTimers()
})
  })

  describe('Filter Todo', () => {
    const preloadedState = {
      todo: {
        todos: [
          {
            id: 1,
            title: 'Learn Next.js',
            completed: false,
          },
          {
            id: 2,
            title: 'Build Todo App',
            completed: false,
          },
          {
            id: 3,
            title: 'Test offline mode',
            completed: true,
          },
        ],
        filter: 'all',
      },
    }

    it('shows only pending todos when filter is pending', async () => {
      renderWithStore(<TodoCard />, { preloadedState })

      await userEvent.click(screen.getByText('PENDING'))

      expect(screen.getByText('Learn Next.js')).toBeInTheDocument()
    })

    // --->
    it('shows only completed todos when filter is completed', async () => {
      renderWithStore(<TodoCard />, { preloadedState })

      await userEvent.click(screen.getByText('COMPLETED'))

      expect(screen.getByText('Test offline mode')).toBeInTheDocument()
    })

    it('shows all todos when filter is all', async () => {
      renderWithStore(<TodoCard />, { preloadedState })

      await userEvent.click(screen.getByText('ALL'))

      expect(screen.getByText('Learn Next.js')).toBeInTheDocument()
      expect(screen.getByText('Test offline mode')).toBeInTheDocument()
    })
  })
})
