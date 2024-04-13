const NewBlog = ({
    title,
    author,
    url,
    handleTitle,
    handleAuthor,
    handleUrl,
    handleSubmit
}) => (
    <div>
        <h2>Create A New Blog</h2>
        <form onSubmit={handleSubmit}>
            <div>
                Title: <input value={title} onChange={handleTitle} />
            </div>
            <div>
                Author: <input value={author} onChange={handleAuthor} />
            </div>
            <div>
                URL: <input value={url} onChange={handleUrl} />
            </div>
            <div>
                <button type='submit'>Login</button>
            </div>
        </form>
    </div>
)

export default NewBlog