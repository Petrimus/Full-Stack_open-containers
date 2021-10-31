import React from 'react'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  const chooseClassname = message.error ? 'error' : 'notification'

  return (
    <div className={chooseClassname}>
      {message.message}
    </div>
  )
}

export default Notification
 
   
