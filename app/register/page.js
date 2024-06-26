"use client"
import React, { useState } from 'react'
// import axios from '../axios'
import { toast } from 'react-hot-toast'
import './Register.css'
import { registerUserAction } from '../actions'
import { useRouter } from 'next/navigation'
import Link from 'next/link'


const Register = () => {
  const [name, setname] = useState('')
  const [email, setemail] = useState('')
  const [mobile, setmobile] = useState('')
  const [password, setpassword] = useState('')
  const [confirm_password, setconfirm_password] = useState('')
  const [role , setRole] = useState('user')
  const [loading, setLoading] = useState(false)
  const [formData,setFormData] = useState();
  const [message,setMessage] = useState("")
  const router = useRouter()
  // const [selectedOption, setSelectedOption] = useState('user');

  // Event handler to update the state when a radio button is selected
  const handleRadioChange = (event) => {
    setRole(event.target.value);
  };
// console.log(name,email,password,mobile)

  const handleRegister = async e => {
   e.preventDefault()
    
    console.log(name,email,password,confirm_password,mobile)
    if(confirm_password !== password){
      setMessage("password is not matched to confirm pas..")
      
    }else{
      const result = await registerUserAction({name,email,password,mobile});
    console.log(result)
    if(result?.success === true){
      router.push('/login')
    }
    setMessage(result.message)
    }
    
    console.log(formData)
    
   console.log()
    // setLoading(true)
    // console.log(role)

    // const res = await axios
    //   .post('/register', {
    //     name,
    //     email,
    //     mobile,
    //     password,
    //     confirm_password,
        
    //   })
    //   .then(() => {
    //     toast.success('Succesfull Register')

    //     setLoading(false)
    //     window.location.reload(false)
    //   })
    //   .catch(err => {
    //     console.log('err react')

    //     toast.error(err.response.data.message)
    //     setLoading(false)
    //   })
  }
  return (
    <>
      {/* <section class='form-container r-f'>
        
      </section> */}

      {loading &&
        toast('Saving You in Database...', {
          icon: '🔃'
        })}
      <div class='form-container'>
        <p class='title'>Register</p>
        <p>{message}</p>
        <form class='form'>
          <div class='input-group'>
            <label for='username'>Name:</label>
            <input
              type='text'
              value={name}
              name='username'
              id='username'
              onChange={e => setname(e.target.value)}
            />
          </div>
          <div class='input-group'>
            <label for='username'>E-mail</label>
            <input
              type='email'
              value={email}
              name='username'
              id='username'
              onChange={e => setemail(e.target.value)}
            />
          </div>
          <div class='input-group'>
            <label for='username'>Mobile:</label>
            <input
              type='text'
              value={mobile}
              name='username'
              id='username'
              onChange={e => setmobile(e.target.value)}
            />
          </div>

          <div class='input-group'>
            <label for='password'>Password</label>
            <input
              type='password'
              name='password'
              value={password}
              id='password'
              placeholder=''
              onChange={e => setpassword(e.target.value)}
            />
          </div>
          <div class='input-group'>
            <label for='password'>Confirm Password</label>
            <input
              type='password'
              name='password'
              value={confirm_password}
              id='password'
              placeholder=''
              onChange={e => setconfirm_password(e.target.value)}
            />
          
          </div>
          
          <br /> <br />
          <button onClick={handleRegister} class='sign'>
            Sign Up
          </button>
          <br/>
          <Link  class='sign' href="/login">
            Sign in
          </Link>
        </form>
        <br />
        <br />
        <br />
      </div>
    </>
  )
}

export default Register
