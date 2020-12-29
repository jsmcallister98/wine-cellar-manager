/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Flex } from 'theme-ui'
import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import Router from 'next/router'
import * as FAicons from 'react-icons/fa'
import { useUser } from "../utils/hooks"

function Login() {

  // UI animation hadnling
  const [focusedUser, setFocusedUser] = useState(false)
  const [focusedPass, setFocusedPass] = useState(false)
  
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [clicked, setClicked] = useState(false)
  
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

  // =======================================================================
  // authentication handling
  // =======================================================================

  const [user, { mutate }] = useUser();
  const [errorMsg, setErrorMsg] = useState('');

  const checkUser = useEffect(() => {
    if (user) {
      Router.replace("/my-cellar")
    }
  })

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    const body = {
      email: e.currentTarget.email.value,
      name: e.currentTarget.name.value,
      password: e.currentTarget.password.value,
    };
    const res = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (res.status === 201) {
      const userObj = await res.json();
      // writing our user object to the state
      console.log(body)
      console.log(userObj)
      mutate(userObj);
    } else {
      setErrorMsg(await res.text());
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const body = {
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
    };
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (res.status === 200) {
      const userObj = await res.json();
      mutate(userObj);
    } else {
      setErrorMsg('Incorrect username or password. Try again!');
    }
  }

  return (
    <div>
      <Head>
        <title>Login Page</title>
      </Head>
      <div className="container">
        <div className="img">
          <Image src="/images/loginpage1.svg" alt="image" width="713" height="600"/>
        </div>
        <Flex 
          className={clicked ? "login-content flip" : "login-content unflip"}>
          <form onSubmit={handleLoginSubmit}>
          {errorMsg ? <p style={{ color: 'red' }}>{errorMsg}</p> : null}
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
                    <label htmlFor="email">
                      <input 
                        type="email" 
                        id="email"
                        name="email"
                        className="input" 
                        onFocus={() => setFocusedUser(true)}
                        onBlur={() => handleFocusedUser()}
                      />
                    </label>
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
                    <label htmlFor="password">
                      <input 
                        type="password" 
                        id="password"
                        name="password"
                        className="input"
                        onFocus={() => setFocusedPass(true)}
                        onBlur={() => handleFocusedPass()} 
                      />
                    </label>
                </div>
              </div>
              <div className="link-cont">
                <Link className="a" href="/">
                  <a>Forgot Password?</a>
                </Link>
              </div>
              <button 
                type="submit" 
                className="btn" 
              >
                Sign In
              </button>
              <button 
                className="btn"
              >
                  New Here? Sign Up
              </button>
            </form>
        </Flex>
        <div className={clicked ? "signup login-content unflip" : "signup login-content flip"}>
          <form onSubmit={handleRegisterSubmit}>
          {errorMsg ? <p style={{ color: 'red' }}>{errorMsg}</p> : null}            <img src="/images/login_img1.svg" />
            <h2 className="title">Welcome</h2>
              <div className={focusedUser ? "input-div one focus" : "input-div one"}>
                <div className="i">
                  <FAicons.FaUser className="fas fa-user"></FAicons.FaUser>
                </div>
                <div className="div">
                    <h5>Name</h5>
                    <label htmlFor="name">
                      <input 
                        type="text"
                        id="name"
                        name="name" 
                        className="input" 
                        onFocus={() => setFocusedUser(true)}
                        onBlur={() => handleFocusedUser()} 
                      />
                    </label>
                </div>
              </div>
              <div className={focusedUser ? "input-div one focus" : "input-div one"}>
                <div className="i">
                  <FAicons.FaUser className="fas fa-user"></FAicons.FaUser>
                </div>
                <div className="div">
                    <h5>Email</h5>
                    <label htmlFor="email">
                      <input 
                        type="email"
                        id="email"
                        name="email"
                        className="input" 
                        onFocus={() => setFocusedUser(true)}
                        onBlur={() => handleFocusedUser()} 
                      />
                    </label>
                </div>
              </div>
              <div className={focusedPass ? "input-div pass focus" : "input-div pass"}>
                <div className="i"> 
                  <FAicons.FaLock className="fas fa-lock"></FAicons.FaLock>
                </div>
                <div className="div">
                    <h5>Password</h5>
                    <label htmlFor="password">
                      <input 
                        type="password"
                        id="password"
                        name="password" 
                        className="input"
                        onFocus={() => setFocusedPass(true)}
                        onBlur={() => handleFocusedPass()} 
                      />
                    </label>
                </div>
              </div>
              <button 
                type="submit"
                className="btn">Sign Up
              </button>
              <input type="submit" className="btn" value="Login" />
            </form>
        </div>
      </div>
    </div>
  )
}

export default Login;