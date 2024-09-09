import React from 'react'
import Navbar from '@/components/ui/Navbar'

interface IProps {
  children: React.ReactNode
}

const Layout = ({children}: IProps) => {
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