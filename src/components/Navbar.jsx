/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from 'theme-ui'
import React from 'react'
import Link from 'next/link'
import { NavLink, Flex } from 'theme-ui'

const Navbar = () => {
  return (
    <nav sx={{ background: 'linear-gradient(180deg, #520101 0%, #000000 100%)',
                }}>
      <Flex sx={{ justifyContent: 'space-between', alignItems: 'center'}}>
        <Link href='/'>
          <a sx={{variant: 'styles.a'}}> WineOh </a>
        </Link>
        <ul>
          <Link href='my-cellar'>
           <a sx={{variant: 'styles.a'}} > My Cellar </a> 
          </Link>
          <Link href='login'> 
           <a sx={{variant: 'styles.a'}} > Sign In </a>
          </Link>
        </ul>
      </Flex>
    </nav>
  )
}

export default Navbar;