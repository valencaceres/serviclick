import React from 'react'

const Button = ({onClick}: any) => {
  return (
    <button onClick={onClick} className='bg-custom-blue text-white w-[500px] h-[35px] rounded-sm hover:bg-custom-blue-hover'>Validar</button>
  )
}

export default Button