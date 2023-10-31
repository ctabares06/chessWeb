import '@testing-library/jest-dom';
import { screen, render } from '@testing-library/react';
import Board from '../components/Board';

describe('board related tests battery', () => {
    test('component should render', () => {
        render(<Board />);
        const board = screen.getByTestId('board')
        expect(board).toBeInTheDocument()
    })
})