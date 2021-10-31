import React, { useState, useEffect } from 'react'
import loginService from './services/login'
import blogService from './services/blogs'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notifications'
import LoginForm from './components/LoginForm'
import LogoutButton from './components/LogoutButton'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  // const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const blogFormRef = React.createRef()

  useEffect(() => {
    blogService.getAll().then((initialblogs) => {
      // console.log(initialblogs)
      const sortedBlogs = initialblogs.sort((a, b) => b.likes - a.likes)
      setBlogs(sortedBlogs)
    })
  }, [])
  // console.log(blogs)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleNotificationMessage = (message, isError) => {
    setNotificationMessage({ message: message, error: isError })
    setTimeout(() => {
      setNotificationMessage(null)
    }, 3000)
  }

  const handleLoginfieldChange = (event) => {
    if (event.target.name === 'password') {
      setPassword(event.target.value)
    }
  }

  const handleLogin = async (username, password) => {
    console.log(username)
    console.log(password)

    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setPassword('')
    } catch (exception) {
      handleNotificationMessage('wrong credentials', true)
      setPassword('')
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.clear()
  }

  const addBlog = async (newBlog) => {
    blogFormRef.current.toggleVisibility()
    try {
      const response = await blogService.create(newBlog)
      response.user = user
      setBlogs(blogs.concat(response))
      handleNotificationMessage(
        `New blog ${response.title} by ${response.author} added`,
        false
      )
    } catch (exception) {
      console.log('error')
    }
  }

  const removeBlog = (id) => async () => {
    const blogToRemove = blogs.find((blog) => blog.id === id)

    if (blogToRemove.user.username === user.username) {
      try {
        await blogService.remove(id)
        setBlogs(blogs.filter((blog) => blog.id !== id))
        handleNotificationMessage(
          `Removed blog ${blogToRemove.title} by ${blogToRemove.author}`,
          false
        )
      } catch (exception) {
        console.log('error')
      }
    }
  }

  const handleLikeButtonClick = (id) => async () => {
    const blogToChange = blogs.find((b) => b.id === id)
    const changedBlog = { ...blogToChange, likes: blogToChange.likes + 1 }

    try {
      await blogService.update(id, changedBlog)
      setBlogs(
        blogs
          .map((blog) => (blog.id !== id ? blog : changedBlog))
          .sort((a, b) => b.likes - a.likes)
      )
    } catch (exception) {
      console.log('error')
    }
  }

  if (user === null) {
    return (
      <div>
        <Notification message={notificationMessage} />
        <LoginForm
          handleLogin={handleLogin}
          handleChange={handleLoginfieldChange}
          // username={username}
          password={password}
        />
      </div>
    )
  }

  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={notificationMessage} />
      <p>
        {user.name} logged in
        <LogoutButton handleclick={handleLogout} />
      </p>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleLikeButtonClick={handleLikeButtonClick}
          user={user}
          handleRemoveButtonClick={removeBlog}
        />
      ))}
      <Togglable buttonLabel="new note" ref={blogFormRef}>
        <BlogForm addBlog={addBlog} />
      </Togglable>
    </div>
  )
}

export default App
