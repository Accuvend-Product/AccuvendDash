import React from 'react'

const TokenGenerated = ({...props}) => {
  return (
    <svg {...props} width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M56.25 45H48.75V37.5H45V45H37.5V48.75H45V56.25H48.75V48.75H56.25V45Z" fill="white" />
      <path d="M28.875 56.25L9.375 44.625C8.25 43.875 7.5 42.75 7.5 41.4375V18.5625C7.5 17.25 8.25 15.9375 9.375 15.375L28.125 4.3125C28.6875 3.9375 29.25 3.75 30 3.75C30.75 3.75 31.3125 3.9375 31.875 4.3125L50.625 15.375C51.75 16.125 52.5 17.25 52.5 18.5625V30H48.75V18.5625L30 7.5L11.25 18.5625V41.4375L30.9375 53.0625L28.875 56.25Z" fill="currentColor"/>
    </svg>

  )
}

export default TokenGenerated