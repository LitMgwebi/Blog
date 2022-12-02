const useFormFields = ({ post, handleChange, handleSubmit, title, method }) => {
    return (
        <div className="formFields">
            <h1>{title}</h1>
            <form method={method} onSubmit={handleSubmit}>
                <div className="titleUpdate">
                    <input
                        type="text"
                        name="title"
                        value={post.title}
                        onChange={handleChange}
                    />
                </div>

                <div className="blogUpdate">
                    <textarea
                        name="blog"
                        value={post.blog}
                        onChange={handleChange}
                    />
                </div>

                <div className="taglineInput">
                    <label>Enter tagline</label>
                    <input
                        name="tagline"
                        type="text"
                        value={post.tagline}
                        onChange={handleChange}
                    />
                </div>

                <div className="authorInput">
                    <input
                        name="author"
                        type="text"
                        value={post.author}
                        onChange={handleChange}
                    />
                </div>

                <div className="dateInput">
                    <input
                        type="date"
                        name="uploadDate"
                        value={post.uploadDate}
                        onChange={handleChange}
                    // defaultValue={currentDate.toString()}
                    />
                </div>

                <div className="button-group">
                    <button type="submit" className="btn btn-primary">Update</button>
                    <Link
                        to={`/record/${id}`}
                        state={{ stateId: id }}
                    >
                        <button>Back</button>
                    </Link>
                </div>
            </form>
        </div>,
        post
    )
}

export default useFormFields;