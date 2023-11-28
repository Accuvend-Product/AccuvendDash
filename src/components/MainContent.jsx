import Sidebar from '../pages/partner/sidebar'
import React from 'react'

const MainContent = ({children}) => {
  return (
    <>
     <Sidebar/>
      <div className='ml-[300px] px-8 sm:px-10 md:px-12 flex-1 pb-10'>
        {children}
      </div>
    </>
    
  )
}

export default MainContent