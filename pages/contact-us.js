/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from 'theme-ui'
import React, { useState, useEffect } from 'react'
import { Box } from "theme-ui";
import * as FaIcons from 'react-icons/fa';
import { SiGmail } from "react-icons/si";
import { GoMail } from "react-icons/go";

const Contact = () => {
  return (
    <Box 
    sx={{ 
          padding: 4,
          mb: 7,
          mx: 'auto',
          width: 550,
          mt: 5,
          border: '1px solid #6d5656',
          background: 'linear-gradient(to top left, #D05B8A, #766FCE)',
          borderRadius: '8px',
          boxShadow: '3px 3px 10px 4px'
        }}
    >
      <h1 sx={{ textAlign: 'center', color: '#fff' }}>Get in touch</h1>
      <Box sx={{ color: '#fff' }}>
        <p sx={{ textAlign: 'center' }}>Need to report a bug or request a new feature?</p>
        <br />
        <p sx={{ color: '#000', fontWeight: '600'}}>Email us at:</p>
        <p>
          <a 
            sx={{ 
              color: '#fff',
              display: 'flex', 
              alignItems: 'center'
              }} href="#" target="_blank" >
                <GoMail 
                sx={{ 
                  fontSize: '2rem', 
                  color: '#fff', 
                  mr: 2,
                  ':hover': { color: '#000'}
                  }}/>
                 wineohapp@gmail.com 
          </a>
        </p>
        <br />
        <p sx={{ color: '#000', fontWeight: '600'}}>Or shoot us a DM on Instagram:</p>
        <p>
          <a 
            sx={{ 
              color: '#fff',
              display: 'flex', 
              alignItems: 'center'
              }} href="#" target="_blank" >
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
        <p sx={{ color: '#000', fontWeight: '600'}}>If you are a developer and would like to contribute:</p>
        <p>
          <a 
            sx={{ 
              color: '#fff',
              display: 'flex', 
              alignItems: 'center'
              }} href="#" target="_blank" >
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