import { ReactNode } from 'react'
interface Props{
    children: ReactNode,
    reverse?: boolean,
    step: number
}
export default function CardStep({children, reverse, step}: Props) {
  return (
    <div className={`flex items-center ${reverse ? 'flex-row-reverse' : 'flex-row'}`}>
        <div className={`w-1 h-4 bg-secondary hidden ${step == 1 && 'hidden'}`}></div>
        <div className='relative'>
            <div className={`h-[100px] w-1 bg-secondary absolute left-[50%] top-[-100px] ${step == 1 && 'hidden'}`}></div>
            <div className={`w-24 h-20 h-24 flex items-center justify-center bg-primary rounded-full text-4xl text-white font-bold`}>{step}</div>
        </div>
        <div className='w-8 h-1 bg-secondary'></div>
        <div className={`flex-1 bg-gray-light rounded-3xl p-4 relative z-10`}>
            <p className="text-2xl">{children}</p>
        </div>
    </div>
  )
}
