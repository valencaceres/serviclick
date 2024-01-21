import { useEffect, useRef, useState } from "react"
import * as ScrollArea from "@radix-ui/react-scroll-area"
import { motion } from "framer-motion"

export default function SideScroll({
  children,
  setShouldClick,
}: {
  children: React.ReactNode
  setShouldClick: (shouldClick: boolean) => void
}) {
  const viewportRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState<boolean>(false)
  const [startX, setStartX] = useState<number>(0)
  const [scrollLeft, setScrollLeft] = useState<number>(0)

  const onMouseDown = (e: MouseEvent) => {
    setShouldClick(true)
    if (viewportRef.current) {
      setIsDragging(true)
      setStartX(e.pageX - viewportRef.current.offsetLeft)
      setScrollLeft(viewportRef.current.scrollLeft)
    }
  }

  const onMouseLeave = (_: MouseEvent) => {
    setIsDragging(false)
  }

  const onMouseUp = (_: MouseEvent) => {
    setIsDragging(false)
  }

  const onMouseMove = (e: MouseEvent) => {
    if (!isDragging || !viewportRef.current) return
    setShouldClick(false)
    e.preventDefault()
    const x = e.pageX - viewportRef.current.offsetLeft
    const walk = x - startX
    viewportRef.current.scrollLeft = scrollLeft - walk
  }

  useEffect(() => {
    const viewportElem = viewportRef.current
    if (viewportElem) {
      viewportElem.addEventListener("mousedown", onMouseDown)
      viewportElem.addEventListener("mouseleave", onMouseLeave)
      viewportElem.addEventListener("mouseup", onMouseUp)
      viewportElem.addEventListener("mousemove", onMouseMove)
    }
    return () => {
      if (viewportElem) {
        viewportElem.removeEventListener("mousedown", onMouseDown)
        viewportElem.removeEventListener("mouseleave", onMouseLeave)
        viewportElem.removeEventListener("mouseup", onMouseUp)
        viewportElem.removeEventListener("mousemove", onMouseMove)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDragging, startX, scrollLeft])

  return (
    <ScrollArea.Root>
      <ScrollArea.Viewport ref={viewportRef}>
        <motion.div
          animate={{ scale: isDragging ? 0.95 : 1 }}
          transition={{ bounce: 0.25, damping: 10, type: "spring" }}
          className="flex cursor-grab select-none gap-2"
        >
          {children}
        </motion.div>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar orientation="horizontal">
        <ScrollArea.Thumb />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  )
}
