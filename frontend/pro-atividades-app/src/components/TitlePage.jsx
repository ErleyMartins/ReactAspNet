import React from 'react'

export default function TitlePage({titulo, children}) {
  return (
    <div className='d-flex justify-content-between align-items-end mt-2 pb-3 border-bottom border-1'>
        <h1 className='p-0'>{titulo}</h1>
        { children }
    </div>
  )
}