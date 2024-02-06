"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

const withScrollAnimation = (Component: any) => {
  return (props: any) => {
    const { ref, inView } = useInView({
      triggerOnce: true,
    })

    const variants = {
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: {
          duration: 0.5,
        },
      },
    }

    return (
      <motion.div
        ref={ref}
        variants={variants}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
      >
        <Component {...props} />
      </motion.div>
    )
  }
}

export default withScrollAnimation
