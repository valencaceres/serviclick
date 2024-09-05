import React from 'react'
import Navbar from '@/components/ui/Navbar'

const Layout = ({children}: any) => {
  return (
    <div>
        <Navbar/>
        <div className='flex justify-center h-[87vh] items-center'>
            {children}
        </div>
    </div>
  )
}

export default Layout