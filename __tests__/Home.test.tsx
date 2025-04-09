import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import HomePage from '@/app/page'

describe('HomePage', () => {
  it('renders welcome message', () => {
    render(<HomePage />)
    expect(screen.getByText(/Creating the future of human-AI collaboration/i)).toBeInTheDocument()
  })
})
