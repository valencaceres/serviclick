import React from 'react'

const Navbar = () => {
  return (
    <div className='h-[13vh] w-[100vw] flex border-gray-200 border-b'>
        <div className='h-[100%] w-[50vw] bg-white flex items-center'>
            <img src="/images/logo.jpg" alt="" className='pl-10'/>
        </div>
        <div className='h-[100%] w-[50vw] bg-custom-green flex items-center pl-10'>
            <h1 className="text-white text-3xl">Validar</h1>
        </div>
    </div>
  )
}

export default Navbar