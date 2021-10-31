import React from 'react'
import PropTypes from 'prop-types'

const Button = ({ handleClick, text, className }) => {

  Button.propTypes = {
    handleClick: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired
  }

  const style = {
    margin: 10,
    borderRadius: 5
  }

  return (
    <button style={style}
      onClick={handleClick}
      className={className}
    >
      {text}
    </button>
  )
}

export default Button
