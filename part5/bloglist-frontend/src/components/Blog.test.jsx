/** @format */

import { render, screen} from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

describe('Blog', async () => {
    let container

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
        container = render(<Blog blog={blog} user={user} />).container
    })

    test('renders title and author', () => {
        
        const element1 = screen.getByText('Title: This is a title')
        const element2 = screen.getByText('Author: James')
    
        expect(element1).toBeDefined()
        expect(element2).toBeDefined()
    
        
    })
    
    test('at start the children are not displayed', () => {

        const div = container.querySelector('.togglableContent')
        expect(div).toHaveStyle('display: none')
    })
    
})




