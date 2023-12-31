import Sidebar from './Sidebar.jsx'
import React from 'react'
import Navbar from './Navbar.jsx'

const MainContent = ({children , sideBartype}) => {
  return (
    <>
      <Navbar/>
      <div className='flex'>
      <Sidebar sideBartype={sideBartype} />
            <div className='ml-[260px] px-8 sm:px-10 md:px-12 flex-1 pb-10 overflow-scroll no-scrollbar'>
              {children}
            </div>
      </div>
     
    </>
    
  )
}

export default MainContent