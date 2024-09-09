import React from 'react'

interface IProps {
  children: React.ReactNode
  gap?: string,
  height?: string, 
  width?: string
}

const ContentCol = ({children, gap, height, width}: IProps) => {
  return (
    <div className='flex flex-col' style={{gap:gap, height, width}}>{children}</div>
  )
}

const ContentRow = ({children, gap, height, width}: IProps) => {
    return (
        <div className='flex flex-row justify-center' style={{gap:gap, height, width}}>{children}</div>
    )
}

export {ContentCol, ContentRow}