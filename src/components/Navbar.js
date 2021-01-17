/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from 'theme-ui'
import React from 'react'
import Link from 'next/link'
import { Flex } from 'theme-ui'
import ThemeToggle from './ThemeToggle'
import { useColorMode } from "theme-ui";
import { useUser } from "../../utils/hooks";
import { FaWineGlassAlt } from "react-icons/fa";
import { FaBars } from "react-icons/fa";
import styled from 'styled-components';

const StyledMenu = styled.nav`
  @media (min-width: 761px) {
    display: none;
  }

  @media (max-width: 761px) {
    z-index: ${({ open }) => open ? '1000000' : '1'};
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: ${({ colorMode }) => colorMode === 'default' ? 
    'linear-gradient(180deg, #000000 0%, #000000 69px)' : 'linear-gradient(180deg, #eee2de 0%, #eee2de 69px)'};
    transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(-100%)'};
    height: 100vh;
    text-align: left;
    padding: 2rem;
    position: absolute;
    top: 0;
    left: 0;
    transition: transform 0.3s ease-in-out;
    border-right: 2px solid ${({ colorMode }) => colorMode === 'default' ? '#520101' : '#520101'};
    }

  @media (max-width: 576px) {
      width: 100%;
    }

  a {
    font-size: 2rem;
    padding: 2rem 0;
    letter-spacing: 0.5rem;
    text-decoration: none;
    transition: color 0.3s linear;

    @media (max-width: 576px) {
      font-size: 1.5rem;
      text-align: center;
    }

    &:hover {
      color: #343078;
    }
  }
`

const Menu = ({ open, colorMode }) => {
  // ========================================================
  // logout button
  // ========================================================
  const [user, { mutate }] = useUser();

  const handleLogout = async () => {
    await fetch('/api/auth', {
      method: 'DELETE',
    });
    // set the user state to null
    mutate(null);
  };

  return (
    <StyledMenu className="stylednav" open={open} colorMode={colorMode}>

      <ThemeToggle />

      <Link href='/'>
      <a sx={{variant: 'styles.a', fontWeight: '500'}} > Home </a> 
      </Link>

      <Link href='my-cellar'>
      <a sx={{variant: 'styles.a', fontWeight: '500'}} > My Cellar </a> 
      </Link>

      <Link href='my-bottles'>
      <a sx={{variant: 'styles.a', fontWeight: '500'}} > My Bottles </a> 
      </Link>

      {!user && <Link href='login'> 
      <a sx={{variant: 'styles.a', fontWeight: '500'}} > Sign In </a>
      </Link>}

      {user && <Link href='/'> 
      <a onClick={handleLogout} sx={{variant: 'styles.a', fontWeight: '500'}} > Logout </a>
      </Link>}

    </StyledMenu>
  )
}

const StyledBurger = styled.button`
  display: none;

  @media (max-width: 760px) {
  position: absolute;
  top: 20px;
  left: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 1000001;

  &:focus {
    outline: none;
  }

  div {
    width: 32px;
    height: 4px;
    background: ${({ colorMode }) => colorMode === 'default' ? '#fff' : '#000'} !important;
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;

    :first-child {
      transform: ${({ open }) => open ? 'rotate(45deg)' : 'rotate(0)'};
    }

    :nth-child(2) {
      opacity: ${({ open }) => open ? '0' : '1'};
      transform: ${({ open }) => open ? 'translateX(20px)' : 'translateX(0)'};
    }

    :nth-child(3) {
      transform: ${({ open }) => open ? 'rotate(-45deg)' : 'rotate(0)'};
    }
  }
}
`

const Burger = ({ open, setOpen, colorMode }) => {

  return (
    <nav id="BURGERNAV" sx={colorMode === 'default' ? { background: 'linear-gradient(180deg, #520101 0%, #000000 100%)', zIndex: '1000', width: '100%', height: 69} : 
    { background: 'linear-gradient(180deg, #6d5642 0%, #eee2de 100%)', zIndex: '1000', width: '100%', height: 69} }>
    <StyledBurger colorMode={colorMode} open={open} onClick={() => setOpen(!open)}>
      <div />
      <div />
      <div />
    </StyledBurger>
    </nav>
  )
}

const Navbar = () => {
  const [open, setOpen] = React.useState(false);
  const [colorMode, setColorMode] = useColorMode();
  const node = React.useRef();

  const [rend, setRend] = React.useState(false);

  const rerender = React.useEffect(() => {
    setRend(true);
  }, []);

  return (
    <div ref={node}>
      <div sx={{display: 'none'}}>{rend}</div>
      <Menu open={open} setOpen={setOpen} colorMode={colorMode} />
      <DesktopNavbar colorMode={colorMode} />
      <Burger open={open} setOpen={setOpen} colorMode={colorMode} />
    </div>
  )
}

const DesktopNavbar = ({ colorMode }) => {

  // ========================================================
  // logout button
  // ========================================================
  const [user, { mutate }] = useUser();

  const handleLogout = async () => {
    await fetch('/api/auth', {
      method: 'DELETE',
    });
    // set the user state to null
    mutate(null);
  };


  return (
    <nav id="NAVBAR" sx={colorMode === 'default' ? { background: 'linear-gradient(180deg, #520101 0%, #000000 100%)', zIndex: '1000', width: '100%'} : 
    { background: 'linear-gradient(180deg, #6d5642 0%, #eee2de 100%)', zIndex: '1000', width: '100%'} }>
      <Flex sx={{ justifyContent: 'space-between', alignItems: 'center'}}>
        <Flex sx={{ justifyContent: 'space-between', alignItems: 'center'}}>
          <Link href='/'>
            <a sx={{variant: 'styles.a', paddingRight: 0, marginRight: 20, ml: 40, letterSpacing: '3px', fontWeight: '600', fontSize: '1.5rem', borderBottom: '3px solid transparent', ':hover': { borderBottom: '3px solid'}}}>
              WineOh 
            </a>
          </Link>
          <ThemeToggle />
        </Flex>
        <Flex sx={{ width: '35%', minWidth: 385, justifyContent: 'space-between'}}>
          <Link href='my-cellar'>
          <a sx={{variant: 'styles.a', fontWeight: '500', borderBottom: '3px solid transparent', ':hover': { borderBottom: '3px solid'}}} > My Cellar </a> 
          </Link>
          <Link href='my-bottles'>
          <a sx={{variant: 'styles.a', fontWeight: '500', borderBottom: '3px solid transparent', ':hover': { borderBottom: '3px solid'}}} > My Bottles </a> 
          </Link>
          <Link href='contact-us'>
          <a sx={{variant: 'styles.a', fontWeight: '500', borderBottom: '3px solid transparent', ':hover': { borderBottom: '3px solid'}}} > Contact Us </a> 
          </Link>
        </Flex>
        <Flex>
          {!user && <Link href='login'> 
          <a sx={{variant: 'styles.a', fontWeight: '500', mr: 40}} > Sign In </a>
          </Link>}
          {user && <Link href='/'> 
          <a onClick={handleLogout} sx={{variant: 'styles.a', fontWeight: '500', mr: 40, borderBottom: '3px solid transparent', ':hover': { borderBottom: '3px solid'}}} > Logout </a>
          </Link>}
        </Flex>
      </Flex>
    </nav>
  )
}

export default Navbar;
