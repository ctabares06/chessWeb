import { boardGenerator } from "../utils/initializers";

test("rows result matches with the size parameter" , () => {
    const exampleRows = [
        ['1A', '1B', '1C'],
        ['2A', '2B', '2C'],
        ['3A', '3B', '3C'],
    ]

    const { board } = boardGenerator(3)

    expect(board).toMatchObject(exampleRows)
})