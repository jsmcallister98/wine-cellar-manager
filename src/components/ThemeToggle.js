import React from 'react'
import { useColorMode } from "theme-ui"

const ThemeToggle = () => {
  const [colorMode, setColorMode] = useColorMode()

  return (
    <button
    onClick={e => {
      setColorMode(colorMode === 'default' ? 'light' : 'default')
    }}>
    {colorMode === 'default' ? 'Light' : 'Dark'}
  </button>
  )
}

export default ThemeToggle;