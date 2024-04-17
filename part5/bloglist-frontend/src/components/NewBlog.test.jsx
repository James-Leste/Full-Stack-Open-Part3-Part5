import { render, screen } from '@testing-library/react'
import NewBlog from './NewBlog'
import userEvent from '@testing-library/user-event'

test('New Blog Details', async () => {
    const createBlog = vi.fn()

    const user = userEvent.setup()

    const {container} = render(<NewBlog handleSubmit={createBlog}/>)

    const titleInput = container.querySelector('#title')
    const authorInput = container.querySelector('#author')
    const urlInput = container.querySelector('#url')
    const sendButton = screen.getByText('Submit')

    await user.type(titleInput, 'This is a title')
    await user.type(authorInput, 'This is a author')
    await user.type(urlInput, 'This is a url')
    await user.click(sendButton)

    console.log(createBlog.mock.calls)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('This is a title')
    expect(createBlog.mock.calls[0][0].author).toBe('This is a author')
    expect(createBlog.mock.calls[0][0].url).toBe('This is a url')

    
})