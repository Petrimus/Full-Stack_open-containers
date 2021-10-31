import React from 'react'
import { useField } from '../hooks'

const BlogForm = ({ addBlog }) => {
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')
  /*
    const handleChange = (event) => {
      if (event.target.name === 'author') {
        setAuthor(event.target.value)
      }
    }
  */
  const hookWithoutReset = (hook) => {
    let { reset, ...omit } = hook
    return omit
  }

  const inputStyle = {
    width: '50%',
    padding: '12px 20px',
    margin: '8px 0px',
    // display: 'inline-block',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box'
  }

  const submitStyle = {
    width: '50%',
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '14px 20px',
    margin: '8px 0',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  }

  const divStyle = {
    borderRadius: '5px',
    backgroundColor: '#f2f2f2',
    padding: '20px'
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const newBlog = { title: title.value, author: author.value, url: url.value }
    addBlog(newBlog)
    title.reset()
    author.reset()
    url.reset()

    // setAuthor('')
    // setUrl('')
  }

  return (
    <div style={divStyle}>
      <h2>Create a new blog</h2>
      <form onSubmit={handleSubmit}>
        <div >
          <div>Title</div>
          <input style={inputStyle}
            {...title.withoutreset}
            name="title"
          />
        </div>
        <div>
          <div>Author</div>
          <input style={inputStyle}
            {...author.withoutreset}
            name="author"
          />
        </div>
        <div>
          <div>URL</div>
          <input style={inputStyle}
            {...hookWithoutReset(url)}
            name="url"
          // type="text"
          // value={url}
          // onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button style={submitStyle} type="submit">submit</button>
      </form>
    </div>
  )
}

export default BlogForm