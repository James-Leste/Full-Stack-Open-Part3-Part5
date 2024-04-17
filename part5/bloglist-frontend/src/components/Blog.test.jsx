/** @format */

import { render, screen} from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

describe('Blog', async () => {
    let container
    const mockLikeHandler = vi.fn()
    const mockDeleteHandler = vi.fn()

    const user = {
        username: 'James',
        id: '65f856046bb9bcdd5c2e97a6',
    }
    const blog = {
        author: 'James',
        title: 'This is a title',
        url: 'url.org',
        likes: 0,
        user: user,
    }

    beforeEach(()=> {
        container = render(<Blog blog={blog} user={user} addLike={mockLikeHandler} deletePost={mockDeleteHandler} />).container
    })

    test('renders title and author', async () => {
        
        const element1 = await screen.getByText('Title: This is a title')
        const element2 = await screen.getByText('Author: James')
    
        expect(element1).toBeDefined()
        expect(element2).toBeDefined()
    
        
    })
    
    test('at start the children are not displayed', () => {

        const div = container.querySelector('.togglableContent')
        expect(div).toHaveStyle('display: none')
    })

    test('after clicking the button, children are displayed', async () => {
        const user = userEvent.setup()
        const button = screen.getByText('View')
        await user.click(button)
    
        const div = container.querySelector('.togglableContent')
        expect(div).toHaveStyle("display: block")
    })

    test('like button hit twice', async () => {

        const user = userEvent.setup()
        const button = screen.getByText('like')
        await user.click(button)
        await user.click(button)
    
    
        expect(mockLikeHandler.mock.calls).toHaveLength(2)
    })
    
    
})







