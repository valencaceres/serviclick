import {ReactNode} from 'react'

interface Props{
    children: ReactNode,
    className: string
}


export const Button = ({children, className}: Props) => {
  return (
    <button className={`text-xs sm:text-base bg-white rounded-full py-1.5 sm:py-2 px-3 sm:px-4 ${className}`}>{children}</button>
  )
}
