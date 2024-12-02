import { ReactNode } from 'react';

interface Props{
    children: ReactNode;
    className?: string
}

export default function WrapperSm ({children, className}: Props){
  return (
    <div className={`w-[95%] max-w-6xl mx-auto ${className}`}>{children}</div>
  )
}