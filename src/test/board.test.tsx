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

    test("should display board", async () => {
        render(<Board />)
        const numberOfCells = 8;
        const boardSize = numberOfCells * numberOfCells;
        await screen.findAllByTestId('slot')
        const board = screen.getAllByTestId("slot")
        
        expect(board.length).toEqual(boardSize)
    })
})