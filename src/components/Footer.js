/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from 'theme-ui'
import React from 'react'
import Link from 'next/link'
import { Flex } from 'theme-ui'
import * as FaIcons from 'react-icons/fa';
import { useColorMode } from "theme-ui";

const Footer = () => {
  const [colorMode, setColorMode] = useColorMode();

  return (
    <footer
      sx={ colorMode === 'default' ? {
        background: 'linear-gradient(0deg, #520101 0%, #000000 100%)',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-around',
        p: 2,
        height: 70,
        color: 'text',
        fontWeight: '500'
      } : {
        background: 'linear-gradient(0deg, #6d5642 0%, #eee2de 100%)',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-around',
        p: 2,
        height: 70,
        color: 'text',
        fontWeight: '500'
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