import React from 'react'

interface ComponentProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>; 
}

const Button: React.FC<ComponentProps> = ({onClick}) => {
  return (
    <button onClick={onClick} className='bg-custom-blue text-white w-[500px] h-[35px] rounded-sm hover:bg-custom-blue-hover'>Validar</button>
  )
}

export default Button