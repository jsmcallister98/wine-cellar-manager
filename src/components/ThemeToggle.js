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
      sx={{ fontSize: '1.2rem', cursor: 'pointer'}}>
      {colorMode === 'default' ? 'Light' : 'Dark'}
    </RiSunFill>
  )
}

export default ThemeToggle;