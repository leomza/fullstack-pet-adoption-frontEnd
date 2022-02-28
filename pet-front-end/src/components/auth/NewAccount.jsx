import React, { useState, useContext } from 'react'
import axios from 'axios'
import { Form, Col, Button } from 'react-bootstrap'
import AuthContext from '../../context/AuthContext'
import swal from 'sweetalert'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

const NewAccount = ({ changeModal, handleClose }) => {
  //Use the function "login" from authContext
  const { setCurrentUser } = useContext(AuthContext)

  //State to NewAccount
  const [user, setUser] = useState({
    email: '',
    password: '',
    repassword: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    bio: '',
    role: 'user',
    saved: [],
    adopted: [],
    fostered: []
  })
  const [passwordShown, setPasswordShown] = useState(false)
  const [repasswordShown, setRepasswordShown] = useState(false)

  //Extract de email and password from a user
  const { email, password, repassword, firstName, lastName, phoneNumber } = user

  const togglePassword = () => {
    setPasswordShown(!passwordShown)
  }

  const toggleRepassword = () => {
    setRepasswordShown(!repasswordShown)
  }

  const onChange = e => {
    try {
      setUser({
        ...user,
        [e.target.name]: e.target.value
      })
    } catch (error) {
      console.error(error)
    }
  }

  //When the user wants to NewAccount
  const onSubmit = async e => {
    try {
      e.preventDefault()
      //Validate no empties fields
      const res = await axios.post('http://localhost:8000/signup', user, {
        withCredentials: true
      })
      setCurrentUser(res.data.user)
      handleClose()
      swal('🐶🐱', res.data.message, 'success')
    } catch (error) {
      if (error.response.data.message) {
        swal('Oh no!', error.response.data.message, 'error')
      } else if (!error.response.data.message && error.response.data) {
        swal('Oh no!', error.response.data, 'error')
      }
      console.error(error)
    }
  }

  return (
    <Form onSubmit={onSubmit}>
      <Form.Group as={Col}>
        <Form.Label htmlFor='firstName'>First name</Form.Label>
        <Form.Control
          type='text'
          name='firstName'
          id='firstName'
          placeholder='Your first name...'
          value={firstName}
          onChange={onChange}
        />
      </Form.Group>

      <Form.Group as={Col}>
        <Form.Label htmlFor='lastName'>Last name</Form.Label>
        <Form.Control
          type='text'
          name='lastName'
          id='lastName'
          placeholder='Your last name...'
          value={lastName}
          onChange={onChange}
        />
      </Form.Group>

      <Form.Group as={Col}>
        <Form.Label htmlFor='email'>Email</Form.Label>
        <Form.Control
          type='email'
          name='email'
          id='email'
          placeholder='Your Email...'
          value={email}
          onChange={onChange}
        />
      </Form.Group>

      <Form.Group as={Col}>
        <Form.Label htmlFor='phoneNumber'>Phone Number</Form.Label>
        <Form.Control
          type='text'
          name='phoneNumber'
          id='phoneNumber'
          placeholder='Your Phone Number...'
          value={phoneNumber}
          onChange={onChange}
        />
      </Form.Group>

      <Form.Group as={Col}>
        <Form.Label htmlFor='password'>Password</Form.Label>
        <Form.Control
          type={passwordShown ? 'text' : 'password'}
          name='password'
          id='password'
          placeholder='Your Password...'
          value={password}
          onChange={onChange}
        />
        <button
          className='button__password'
          type='button'
          onClick={togglePassword}
        >
          {passwordShown ? (
            <FontAwesomeIcon icon={faEye} title='Go Home' />
          ) : (
            <FontAwesomeIcon icon={faEyeSlash} title='Go Home' />
          )}
        </button>
      </Form.Group>

      <Form.Group as={Col}>
        <Form.Label htmlFor='repassword'>Repeat Password</Form.Label>
        <Form.Control
          type={repasswordShown ? 'text' : 'password'}
          name='repassword'
          id='repassword'
          placeholder='Re enter your password...'
          value={repassword}
          onChange={onChange}
        />
        <button
          className='button__password'
          type='button'
          onClick={toggleRepassword}
        >
          {repasswordShown ? (
            <FontAwesomeIcon icon={faEye} title='Go Home' />
          ) : (
            <FontAwesomeIcon icon={faEyeSlash} title='Go Home' />
          )}
        </button>
      </Form.Group>

      <div className='button__form'>
        <Button type='submit'>Create account</Button>
        <Button variant='warning' onClick={changeModal}>
          Already have an account
        </Button>
      </div>
    </Form>
  )
}

export default NewAccount
