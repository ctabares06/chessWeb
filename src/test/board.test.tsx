import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Board from '../components/board/Board'

describe("board test suite", () => {
    test("component should render", async () => {
        render(<Board />)

        await screen.findByRole('heading')
        const title = screen.getByRole('heading')

        expect(title).toHaveTextContent('Board')
    })
})