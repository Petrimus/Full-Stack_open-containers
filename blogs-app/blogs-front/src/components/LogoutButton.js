import React from 'react'

const LogoutButton = ({ handleclick }) => {
  const style = {
    margin: 10,
    borderRadius: 5
  }

  return (
    <button style={style} onClick={handleclick}>logout</button>
  )
}

export default LogoutButton