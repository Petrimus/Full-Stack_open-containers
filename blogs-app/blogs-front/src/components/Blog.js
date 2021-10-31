import React, { useState } from 'react'
import Button from './Button'
import PropTypes from 'prop-types'

const Blog = ({
  blog,
  handleLikeButtonClick,
  handleRemoveButtonClick,
  user,
}) => {
  const [showAllBlog, setShowAllBlog] = useState(false)

  Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    handleLikeButtonClick: PropTypes.func.isRequired,
    handleRemoveButtonClick: PropTypes.func.isRequired,
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    marginLeft: 10,
    borderRadius: 5,
    backgroundColor: '#F5F5F5',
  }

  const handleShowClick = ({ target }) => {
    // console.log(target.className)
    if (target.className !== 'like') {
      setShowAllBlog(!showAllBlog)
    }
  }

  const howToShowBlog = () => {
    if (showAllBlog) {
      // console.log(blog)

      return (
        <div className="blogFull" style={{ paddingLeft: 10 }}>
          {blog.title} {blog.author}
          <br />
          <a href={blog.url}> {blog.url}</a>
          <br />
          {blog.likes} likes
          <Button
            handleClick={handleLikeButtonClick(blog.id)}
            className="like"
            text="like"
          />
          <br />
          added by {blog.user.name}
          {user.username === blog.user.username && (
            <Button
              text="remove"
              handleClick={handleRemoveButtonClick(blog.id)}
            />
          )}
        </div>
      )
    } else {
      return (
        <div className="blogMin" style={{ paddingLeft: 10 }}>
          {blog.title} {blog.author}
        </div>
      )
    }
  }

  return (
    <div className="blog" style={blogStyle} onClick={handleShowClick}>
      {howToShowBlog()}
    </div>
  )
}

export default Blog
