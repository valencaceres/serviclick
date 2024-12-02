import { ReactNode } from 'react'
interface Props{
    children: ReactNode,
    reverse?: boolean,
    step: number
}
export default function CardStepMobile({children, step}: Props) {
  return (
    <div className='flex flex-col items-center'>
        <div className='w-20 h-20 rounded-full flex items-center justify-center text-4xl bg-primary text-white'>{step}</div>
        <div className='w-1 bg-secondary h-8'></div>
        <div className={`flex-1 bg-gray-light rounded-3xl p-4 relative z-10`}>
            <p>{children}</p>
        </div>
    </div>
  )
}
