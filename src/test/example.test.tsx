import { render, screen } from '@testing-library/react'
import App from '../App'
import '@testing-library/jest-dom'

test("app loads", async () => {
    render(<App />)
    await screen.findByRole('heading')

    expect(screen.getByRole('heading')).toHaveTextContent('Vite + React')
})