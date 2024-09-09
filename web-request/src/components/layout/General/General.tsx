import React from 'react'

const ContentCol = ({children, gap, height, width}: any) => {
  return (
    <div className='flex flex-col' style={{gap:gap, height, width}}>{children}</div>
  )
}

const ContentRow = ({children, gap, height, width}: any) => {
    return (
        <div className='flex flex-row justify-center' style={{gap:gap, height, width}}>{children}</div>
    )
}

export {ContentCol, ContentRow}