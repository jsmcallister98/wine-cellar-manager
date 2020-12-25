/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Flex, Button } from 'theme-ui'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import * as FAicons from 'react-icons/fa'
import { csrfToken } from "next-auth/client";

function Login({ csrfToken }) {

  const [focusedUser, setFocusedUser] = React.useState(false)
  const [focusedPass, setFocusedPass] = React.useState(false)
  
  const [userName, setUserName] = React.useState('')
  const [password, setPassword] = React.useState('')

  const [clicked, setClicked] = React.useState(false)
  
  const handleFocusedUser = () => {
    if (userName === '') {
      setFocusedUser(false)
    };
  };

  const handleFocusedPass = () => {
    if (password === '') {
      setFocusedPass(false)
    };
  };

  return (
    <div>
      <div className="container">
        <div className="img">
          <Image src="/images/loginpage1.svg" alt="image" width="713" height="600"/>
        </div>
        <Flex 
          className={clicked ? "login-content flip" : "login-content unflip"}>
          <form method='post' action="/api/auth/signin/email">
            <img src="/images/login_img1.svg" />
            <h2 className="title">Welcome</h2>
              <div className={focusedUser ? "input-div one focus" : "input-div one"}
                sx={{borderBottom: '1px solid', color: 'text'}}
                >
                <div className="i">
                  <FAicons.FaUser className="fas fa-user" sx={{color: 'text'}}></FAicons.FaUser>
                </div>
                <div className="div"> 
                    <h5>Email</h5>
                    <input name='csrfToken' type='hidden' defaultValue={csrfToken} />
                    <input type="text" className="input" name='email'
                      onFocus={() => setFocusedUser(true)}
                      onChange={event => setUserName(event.target.value)}
                      onBlur={() => handleFocusedUser()}
                    />
                </div>
              </div>
              <Button type="submit" className="btn" value="Login">Sign In With Email</Button>
            </form>
        </Flex>
      </div>
    </div>
  )
}

Login.getInitialProps = async (context) => {
  return {
    csrfToken: await csrfToken(context)
  }
}

export default Login;