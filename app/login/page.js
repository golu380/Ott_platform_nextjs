"use client"

import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
// import axios from '../axios'
import Register from '../register/page'


import './Login.css'
import Link from 'next/link'
import { loginUserAction } from '../actions'
import { useRouter } from 'next/navigation';
// import { UserGroupIcon } from '@heroicons/react/24/outline'


const Login = () => {
  // const navigate = useNavigate()
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [role , setRole] = useState('user')
  const [message,setMessage] = useState("")
  const [islogin,setIslogin] = useState("false")
 const router = useRouter()
  const handleRadioChange = (event) => {
    setRole(event.target.value);
  };

  const handleLogin = async e => {
    e.preventDefault()

    console.log(email,password)

    const result = await loginUserAction({email,password})
    if(result?.islogin === true){
      router.push('/')
      setIslogin(true)
      setMessage(result.message)
      
    }
    
   setMessage(result.message)
    console.log(result);
    
  }

  const togglePopup = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <section className='form-container'>
        {loading &&
          toast('Loggin in...', {
            icon: '🔃'
          })}

        <div className='form-container'>
          <p className='title'>Login</p>
          <p>{message}</p>
          <form className='form'>
            <div className='input-group'>
              <label htmlFor='username'>E-mail</label>
              <input type='text' value={email} name='username' id='username' onChange={(e) => setemail(e.target.value)}/>
            </div>
            <div className='input-group'>
              <label htmlFor='password'>Password</label>
              <input
                type='password'
                name='password'
                value={password}
                id='password'
                placeholder=''
                onChange={(e) => setpassword(e.target.value)}
              />
              <div className='forgot'>
                <a rel='noopener noreferrer' href='#'>
                  Forgot Password ?
                </a>
              </div>
            </div>
         
            <button onClick={handleLogin} className='sign'>Sign in</button>
          </form>
          <br />
          <br />
          <br />
          <p className='signup'>
            Don't have an account?
            <Link onClick={togglePopup} className='' href="/register">
              Sign up
            </Link>
          </p>
        </div>
        {isOpen && (
          <div className='pop-overlay'>
            <div className='popup-r'>
              <Register />
              <button  className='cls-btn c-r' onClick={togglePopup}>
                <i className='fa-solid fa-xmark'></i>
              </button>
            </div>
          </div>
        )}
      </section>
    </>
  )
}

export default Login
