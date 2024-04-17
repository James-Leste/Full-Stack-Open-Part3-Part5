/** @format */

import { useState } from 'react'

const NewBlog = ({ handleSubmit }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const addBlog = async (event) => {
        event.preventDefault()
        const newBlog = {
            title: title === '' ? null : title,
            author: author === '' ? null : author,
            url: url === '' ? null : url,
        }
        await handleSubmit(newBlog)
    }
    return (
        <div>
            <h2>Create A New Blog</h2>
            <form onSubmit={addBlog}>
                <div>
                    Title:{' '}
                    <input
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        id='title'
                    />
                </div>
                <div>
                    Author:{' '}
                    <input
                        value={author}
                        onChange={(event) => setAuthor(event.target.value)}
                        id='author'
                    />
                </div>
                <div>
                    URL:{' '}
                    <input
                        value={url}
                        onChange={(event) => setUrl(event.target.value)}
                        id='url'
                    />
                </div>
                <div>
                    <button type='submit'>Submit</button>
                </div>
            </form>
        </div>
    )
}

export default NewBlog
