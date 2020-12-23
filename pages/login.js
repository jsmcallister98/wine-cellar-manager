/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Flex } from 'theme-ui'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import * as FAicons from 'react-icons/fa'

const Login = () => {

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
          <form action="index.html">
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
                    <input type="text" className="input" 
                      onFocus={() => setFocusedUser(true)}
                      onChange={event => setUserName(event.target.value)}
                      onBlur={() => handleFocusedUser()}
                    />
                </div>
              </div>
              <div className={focusedPass ? "input-div pass focus" : "input-div pass"}
                sx={{borderBottom: '1px solid', color: 'text'}}
                >
                <div className="i"> 
                  <FAicons.FaLock className="fas fa-lock" sx={{color: 'text'}}></FAicons.FaLock>
                </div>
                <div className="div">
                    <h5>Password</h5>
                    <input type="password" className="input"
                      onFocus={() => setFocusedPass(true)}
                      onChange={event => setPassword(event.target.value)}
                      onBlur={() => handleFocusedPass()} 
                    />
                </div>
              </div>
              <div className="link-cont">
                <Link className="a" href="/">
                  <a>Forgot Password?</a>
                </Link>
              </div>
              <input type="submit" className="btn" value="Login" />
              <button 
                onClick={(e) => [e.preventDefault(), setClicked(true)]}
                className="btn">Sign Up
              </button>
            </form>
        </Flex>
        {/* <div className={clicked ? "signup login-content unflip" : "signup login-content flip"}>
          <form action="index.html">
            <img src="img/avatar.svg" />
            <h2 className="title">Welcome</h2>
              <div className={focusedUser ? "input-div one focus" : "input-div one"}>
                <div className="i">
                  <FAicons.FaUser className="fas fa-user"></FAicons.FaUser>
                </div>
                <div className="div">
                    <h5>Email</h5>
                    <input type="text" className="input" 
                      onFocus={() => setFocusedUser(true)}
                      onChange={event => setUserName(event.target.value)}
                      onBlur={() => handleFocusedUser()} 
                    />
                </div>
              </div>
              <div className={focusedPass ? "input-div pass focus" : "input-div pass"}>
                <div className="i"> 
                  <FAicons.FaLock className="fas fa-lock"></FAicons.FaLock>
                </div>
                <div className="div">
                    <h5>Password</h5>
                    <input type="password" className="input"
                      onFocus={() => setFocusedPass(true)}
                      onChange={event => setPassword(event.target.value)}
                      onBlur={() => handleFocusedPass()} 
                    />
                </div>
              </div>
              <div className={focusedPass ? "input-div pass focus" : "input-div pass"}>
                <div className="i"> 
                  <FAicons.FaLock className="fas fa-lock"></FAicons.FaLock>
                </div>
                <div className="div">
                    <h5>Confirm Password</h5>
                    <input type="password" className="input"
                      onFocus={() => setFocusedPass(true)}
                      onChange={event => setPassword(event.target.value)}
                      onBlur={() => handleFocusedPass()} 
                    />
                </div>
              </div>
              <button 
                onClick={(e) => [e.preventDefault(), setClicked(false)]}
                className="btn">Sign Up
              </button>
              <input type="submit" className="btn" value="Login" />
            </form>
        </div> */}
      </div>
    </div>
  )
}

export default Login