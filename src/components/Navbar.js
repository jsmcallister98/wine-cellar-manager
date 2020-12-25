/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from 'theme-ui'
import React from 'react'
import Link from 'next/link'
import { Flex } from 'theme-ui'
import ThemeToggle from './ThemeToggle'
import { useColorMode } from "theme-ui";

const Navbar = () => {
  const [colorMode, setColorMode] = useColorMode()
  return (
    <nav sx={colorMode === 'default' ? { background: 'linear-gradient(180deg, #520101 0%, #000000 100%)', zIndex: '1000'} : 
    { background: 'linear-gradient(180deg, #6d5642 0%, #eee2de 100%)', zIndex: '1000'} }>
      <Flex sx={{ justifyContent: 'space-between', alignItems: 'center'}}>
        <Flex sx={{ justifyContent: 'space-between', alignItems: 'center'}}>
          <Link href='/'>
            <a sx={{variant: 'styles.a', paddingRight: 0, marginRight: 20, fontWeight: '500', fontSize: '1.2rem'}}>
              WineOh 
            </a>
          </Link>
          <ThemeToggle />
        </Flex>
        <ul>
          <Link href='my-cellar'>
           <a sx={{variant: 'styles.a', fontWeight: '500'}} > My Cellar </a> 
          </Link>
          <Link href='login'> 
           <a sx={{variant: 'styles.a', fontWeight: '500'}} > Sign In </a>
          </Link>
        </ul>
      </Flex>
    </nav>
  )
}

export default Navbar;