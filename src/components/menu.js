import React, { useState, useRef, useEffect } from "react"
import { Link } from "gatsby"
// gatsby images
import { Image } from "./gatsby-images/image"
// icons
import { Close } from "../icons/icons"
// data
import data from "../data/products.json"

// motion
import { motion, AnimatePresence } from "framer-motion"

const transition = { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.9] }

// variants
const parent = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 1,
    },
  },
}
const titleSlideUp = {
  initial: { y: 200 },
  animate: { y: 0 },
}

const maskAnimation = {
  animate: { width: 0 },
  initial: { width: "100%" },
}

const Menu = ({ menuState, setMenuState, x, y, setCursorHovered }) => {
  return (
    <AnimatePresence>
      {menuState && (
        <>
          <motion.div
            initial={{ visibility: "hidden" }}
            animate={{ visibility: "visible", transition: { delay: 1 } }}
            exit={{ visibility: "hidden", transition: { delay: 1 } }}
            className="products"
          >
            <div className="menu-title">Products</div>
            <div
              onClick={() => setMenuState(!menuState)}
              className="close"
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
            >
              <Close />
            </div>
            <div className="menu">
              <div className="container">
                <div className="menu-inner">
                  <motion.ul
                    variants={parent}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    {data.map(list => (
                      <List
                        key={list.id}
                        id={list.id}
                        title={list.title}
                        src={list.src}
                        leftLineFlex={list.leftLineFlex}
                        rightLineFlex={list.rightLineFlex}
                        thumbnailPosition={list.thumbnailPosition}
                        x={x}
                        y={y}
                        offset={list.offset}
                        setCursorHovered={setCursorHovered}
                      />
                    ))}
                  </motion.ul>
                </div>
              </div>
            </div>
          </motion.div>
          <Panels />
        </>
      )}
    </AnimatePresence>
  )
}

const List = ({
  title,
  src,
  leftLineFlex,
  rightLineFlex,
  thumbnailPosition,
  id,
  x,
  y,
  offset,
  setCursorHovered,
}) => {
  let list = useRef(false)
  const [hoverState, setHoverState] = useState(false)
  const [listPosition, setListPosition] = useState({
    top: 0,
    left: 0,
  })

  useEffect(() => {
    setListPosition({
      top: list.current.getBoundingClientRect().top,
      left: list.current.getBoundingClientRect().left,
    })
  }, [hoverState])

  return (
    <motion.li
      ref={list}
      onHoverStart={() => setHoverState(true)}
      onHoverEnd={() => setHoverState(false)}
      onMouseEnter={() => setCursorHovered(true)}
      onMouseLeave={() => setCursorHovered(false)}
    >
      <Link to={`/product/${id}`}>
        <div className="wrapper">
          <div className={`line left flex-${leftLineFlex}`}>
            <motion.div
              variants={maskAnimation}
              transition={{ ...transition, duration: 1 }}
              className="mask"
            ></motion.div>
          </div>
          <div className="title">
            <h2>
              <motion.div
                variants={titleSlideUp}
                transition={transition}
                className="text"
              >
                {title}
              </motion.div>
            </h2>
          </div>
          <div className="thumbnail" style={{ left: thumbnailPosition }}>
            <Image src={src} />
            <motion.div
              variants={maskAnimation}
              transition={{ ...transition, duration: 1 }}
              className="mask"
            ></motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: hoverState ? 1 : 0,
              x: x - listPosition.left + offset,
              y: y - listPosition.top,
            }}
            transition={{ ease: "linear" }}
            className="floating-image"
          >
            <Image src={src} />
          </motion.div>
          <div className={`line right flex-${rightLineFlex}`}>
            <motion.div
              variants={maskAnimation}
              transition={{ ...transition, duration: 1 }}
              className="mask right"
            ></motion.div>
          </div>
        </div>
      </Link>
    </motion.li>
  )
}

const Panels = () => {
  const [panelComplete, setPanelComplete] = useState(false)
  return (
    <>
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: [0, window.innerHeight, 0], bottom: [null, 0, 0] }}
        exit={{ height: [0, window.innerHeight, 0], top: [null, 0, 0] }}
        transition={{ ...transition, duration: 2, times: [0, 0.5, 1] }}
        className="left-panel-background"
        style={{ backgroundColor: panelComplete ? "#e7e7de" : "#e7dee7" }}
      ></motion.div>

      <motion.div
        initial={{ height: 0 }}
        animate={{
          height: [0, window.innerHeight, 0],
          bottom: [0, 0, window.innerHeight],
        }}
        exit={{ height: [0, window.innerHeight, 0], bottom: [null, 0, 0] }}
        transition={{ ...transition, duration: 2, times: [0, 0.5, 1] }}
        className="right-panel-background"
        onAnimationComplete={() => {
          setPanelComplete(!panelComplete)
        }}
        style={{ backgroundColor: panelComplete ? "#e7e7de" : "#e7dee7" }}
      ></motion.div>
    </>
  )
}

export default Menu
