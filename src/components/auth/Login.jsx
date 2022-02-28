import React, { useState, useContext } from 'react'
import { Form, Col, Button } from 'react-bootstrap'
import axios from 'axios'
import AuthContext from '../../context/AuthContext'
import swal from 'sweetalert'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { url } from '../../config'

const Login = ({ changeModal, handleClose }) => {
  //State to login
  const [user, setUser] = useState({ email: '', password: '' })
  const [passwordShown, setPasswordShown] = useState(false)
  //Use the function "login" from authContext
  const { setCurrentUser } = useContext(AuthContext)

  //Extract de email and password from a user
  const { email, password } = user

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

  const togglePassword = () => {
    setPasswordShown(!passwordShown)
  }

  //When the user wants to login
  const onSubmit = async e => {
    try {
      e.preventDefault()
      //Validate no empties fields
      const res = await axios.post(`${url}/login`, user, {
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

      <div className='button__form'>
        <Button type='submit'>Login</Button>
        <Button variant='warning' onClick={changeModal}>
          I don't have an account
        </Button>
      </div>
    </Form>
  )
}

export default Login
