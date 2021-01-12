/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from 'theme-ui'
import React from 'react'
import Link from 'next/link'
import { Flex } from 'theme-ui'

const Footer = () => {
  return (
    <footer
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        p: 2,
      }}>
      <Link href="/">
        <a>Home</a>
      </Link>
      <Link href="/">
        <a>Contact</a>
      </Link>
      <div sx={{ mx: 'auto' }} />
      <div sx={{ p: 2 }}>© 2019 Jane Doe</div>
    </footer>
  )
}

export default Footer;