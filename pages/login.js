import React from 'react'
import Link from 'next/link'
import * as FAicons from 'react-icons/fa'

const Login = () => {

  const [focusedUser, setFocusedUser] = React.useState(false)
  const [focusedPass, setFocusedPass] = React.useState(false)
  
  const [userName, setUserName] = React.useState('')
  const [password, setPassword] = React.useState('')
  
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
      <img className="wave" src="img/wave.png" />
      <div className="container">
        <div className="img">
          <img src="img/bg.svg" />
        </div>
        <div className="login-content">
          <form action="index.html">
            <img src="img/avatar.svg" />
            <h2 className="title">Welcome</h2>
              <div className={focusedUser ? "input-div one focus" : "input-div one"}>
                <div className="i">
                  <FAicons.FaUser className="fas fa-user"></FAicons.FaUser>
                </div>
                <div className="div">
                    <h5>Username</h5>
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
              <div className="link-cont">
                <Link className="a" href="/">
                  <a>Forgot Password?</a>
                </Link>
              </div>
              <input type="submit" className="btn" value="Login" />
            </form>
        </div>
      </div>
    </div>
  )
}

export default Login