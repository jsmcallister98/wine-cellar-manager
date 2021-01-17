/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from 'theme-ui'
import React from 'react'
import { useColorMode } from "theme-ui"
import { RiSunFill } from 'react-icons/ri'

const ThemeToggle = () => {
  const [colorMode, setColorMode] = useColorMode()

  return (
    <RiSunFill
      onClick={e => {
        setColorMode(colorMode === 'default' ? 'light' : 'default')
      }}
      sx={{ fontSize: 20, cursor: 'pointer', ':hover': { fontSize: 21 }}}>
      {colorMode === 'default' ? 'Light' : 'Dark'}
    </RiSunFill>
  )
}

export default ThemeToggle;