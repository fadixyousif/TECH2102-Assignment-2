import { test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App'

test('renders name Fadi Yousif on the page', () => {
  render(<App />)
  const name = screen.getByText(/Fadi Yousif/i)
  expect(name).toBeTruthy()
})
