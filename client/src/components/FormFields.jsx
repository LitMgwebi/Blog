function FormFields({ post, handleChange, handlePhoto }) {
    return (
        <div className="formFields">
            <div className="titleInput">
                <label>Title:</label>
                <input
                    type="text"
                    name="title"
                    value={post.title}
                    onChange={handleChange}
                />
            </div>

            <div className="blogInput">
                <label>Blog:</label>
                <textarea
                    name="blog"
                    value={post.blog}
                    onChange={handleChange}
                />
            </div>

            <div className="taglineInput">
                <label>Tagline:</label>
                <input
                    name="tagline"
                    type="text"
                    value={post.tagline}
                    onChange={handleChange}
                />
            </div>

            <div className="authorInput">
                <label>Author:</label>
                <input
                    name="author"
                    type="text"
                    value={post.author}
                    onChange={handleChange}
                />
            </div>

            <div className="dateInput">
                <label>Date:</label>
                <input
                    type="date"
                    name="uploadDate"
                    value={post.uploadDate}
                    onChange={handleChange}
                />
            </div>

            <div className="photoInput">
                <label>Photo:</label>
                <input
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    name="photo"
                    onChange={handlePhoto} />
            </div>
        </div>
    )
}

export default FormFields;