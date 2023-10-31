import '@testing-library/jest-dom'
import { screen, render } from '@testing-library/react';
import Home from '../components/Home';

describe("basic tests", () => {
    test("component should render", () => {
        const title = "text"
        render(<Home title={title} />)
        const getTitle = screen.getByRole('heading')
        expect(getTitle).toHaveTextContent(title)
    })
})