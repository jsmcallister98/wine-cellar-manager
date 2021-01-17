/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from 'theme-ui'
import React, { useState, useEffect } from 'react'
import { Box } from "theme-ui";
import * as FaIcons from 'react-icons/fa';
import { GoMail } from "react-icons/go";
import Clipboard from "clipboard";
import { BiCoffeeTogo } from "react-icons/bi";

const Contact = () => {

  const [msg, setMsg] = useState("");

  useEffect(() => {
    const clip = new Clipboard(".email");
    clip.on("success", function() {
      setMsg("Copied to clipoard!")
    })
  })

  return (
    <Box 
    sx={{ 
          padding: 4,
          mb: 7,
          mx: 'auto',
          width: '100%',
          maxWidth: 600,
          mt: 5,
          border: '1px solid #6d5656',
          background: 'linear-gradient(to top right, #B051A6, #5F0123)',
          borderRadius: '8px',
          boxShadow: '3px 3px 10px 4px'
        }}
    >
      <h1 sx={{ textAlign: 'center', color: '#fff' }}>Get in touch</h1>
      <Box sx={{ color: '#fff' }}>
        <p sx={{ textAlign: 'center' }}>Need to report a bug or request a new feature?</p>
        <br />
        <p sx={{ color: '#000', fontWeight: '600'}}>Email us at:</p>
        <div className="email" data-clipboard-text="wineohapp@gmail.com"
          sx={{ 
            color: '#fff',
            display: 'flex', 
            alignItems: 'center',
            cursor: 'pointer'
            }}>
              <GoMail 
              sx={{ 
                fontSize: '2rem', 
                color: '#fff', 
                mr: 2,
                ':hover': { color: '#000'}
                }}/>
                wineohapp@gmail.com 
        </div>
        <p sx={{ fontSize: '0.8rem', color: "#000" }}>{msg}</p>
        <br />
        <p sx={{ color: '#000', fontWeight: '600'}}>Or shoot us a DM on Instagram:</p>
        <p>
          <a 
            sx={{ 
              color: '#fff',
              display: 'flex', 
              alignItems: 'center'
              }} href="https://www.instagram.com/wineohapp/?hl=en" target="_blank" >
                <FaIcons.FaInstagram 
                sx={{ 
                  fontSize: '2rem', 
                  color: '#fff', 
                  mr: 2,
                  ':hover': { color: '#000'}
                  }}/>
                 @wineohapp 
          </a>
        </p>
        <br />
        <p sx={{ color: '#000', fontWeight: '600'}}>If you are enjoying your experience and feeling generous:</p>
        <p>
          <a 
            sx={{ 
              color: '#fff',
              display: 'flex', 
              alignItems: 'center'
              }} href="https://www.buymeacoffee.com/jmcallister" target="_blank" >
                <BiCoffeeTogo 
                sx={{ 
                  fontSize: '2rem', 
                  color: '#fff', 
                  mr: 2,
                  ':hover': { color: '#000'}
                  }}/>
                 Buy me a coffee :)
          </a>
        </p>
        <br />
        <p sx={{ color: '#000', fontWeight: '600'}}>If you are a developer and would like to contribute:</p>
        <p>
          <a href="https://www.linkedin.com/in/jacob-mcallister-50a18b174/"
             target="_blank"
            sx={{ 
              color: '#fff',
              display: 'flex', 
              alignItems: 'center'
              }}>
                <FaIcons.FaLinkedin 
                sx={{ 
                  fontSize: '2rem', 
                  color: '#fff', 
                  mr: 2,
                  ':hover': { color: '#000'}
                  }}/>
                 Let's connect on LinkedIn 
          </a>
        </p>
      </Box>
    </Box>
  )
}

export default Contact;