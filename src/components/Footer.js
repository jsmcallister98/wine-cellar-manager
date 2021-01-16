/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from 'theme-ui'
import React from 'react'
import Link from 'next/link'
import { Flex } from 'theme-ui'
import * as FaIcons from 'react-icons/fa';

const Footer = () => {
  return (
    <footer
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-around',
        p: 2,
        height: 70,
        bg: '#606060',
        color: 'muted'
      }}>
      <Link href="/">
        <a>Home</a>
      </Link>
      <Flex sx={{justifyContent: 'space-between', width: 150}}>
        <a href="#" target="_blank"><FaIcons.FaInstagram sx={{ fontSize: '1.5rem'}}/></a>
        <a href="#" target="_blank"><FaIcons.FaGithub sx={{ fontSize: '1.5rem'}}/></a>
        <a href="#" target="_blank"><FaIcons.FaLinkedin sx={{ fontSize: '1.5rem'}}/></a>
      </Flex>
      <Link href="/contact-us">
        <a>Contact</a>
      </Link>
    </footer>
  )
}

export default Footer;