import { ReactNode } from 'react';

interface Props{
    children: ReactNode;
    className?: string
}

export default function Wrapper ({children, className}: Props){
  return (
    <div className={`w-[95%] max-w-7xl mx-auto ${className}`}>{children}</div>
  )
}