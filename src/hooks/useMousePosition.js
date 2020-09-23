import { useState, useEffect } from "react"

export default function useMousePosition() {
  const [mousePositition, setMousePositition] = useState({ x: null, y: null })

  useEffect(() => {
    function handlePositon(e) {
      setMousePositition({ x: e.pageX, y: e.pageY })
    }

    window.addEventListener("mousemove", handlePositon)
    return () => {
      window.removeEventListener("mousemove", handlePositon)
    }
  }, [])
  return mousePositition
}
