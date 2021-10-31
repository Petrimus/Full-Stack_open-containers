import React from 'react'
import { useField } from '../hooks'

const LoginForm = ({ handleLogin }) => {

  const username = useField('text')
  const password = useField('text')  

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
    handleLogin(username.value, password.value)
    username.reset()
    password.reset()
  }

  return (
    <div className='loginForm' style={divStyle}>
      <h1>Login to application</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input { ...username.withoutreset}
            placeholder='Username'
            style={inputStyle}
          />
        </div>
        <div>
          <input {...password.withoutreset}
            style={inputStyle}
            name="Password"
            placeholder='Password'
          />
        </div>
        <button
          style={submitStyle}
          type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm
