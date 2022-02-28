import React, { useState, useContext, useEffect } from 'react'
import { Form, Col, Button } from 'react-bootstrap'
import AuthContext from '../../context/AuthContext'
import axios from 'axios'
import swal from 'sweetalert'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

const ProfileSettings = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext)

  const [user, setUser] = useState({
    email: '',
    password: '',
    repassword: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    bio: ''
  })
  const [passwordShown, setPasswordShown] = useState(false)
  const [repasswordShown, setRepasswordShown] = useState(false)

  useEffect(() => {
    if (currentUser) {
      setUser({
        email: currentUser.email,
        password: '',
        repassword: '',
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        phoneNumber: currentUser.phoneNumber,
        bio: currentUser.bio
      })
    }
  }, [currentUser])

  const {
    email,
    password,
    repassword,
    firstName,
    lastName,
    phoneNumber,
    bio
  } = user

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

  const onSubmit = async e => {
    try {
      e.preventDefault()
      const res = await axios.put(
        `http://localhost:8000/user/${currentUser._id}`,
        user,
        { withCredentials: true }
      )
      setCurrentUser(res.data.user)
      swal('Guau, miau, guauuuu! 🐶', res.data.message, 'success')
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
    <div className='form__profileSettings--container'>
      <Form className='form__profileSettings' onSubmit={onSubmit}>
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

        <Form.Group as={Col}>
          <Form.Label htmlFor='bio'>About you</Form.Label>
          <Form.Control
            type='text'
            name='bio'
            id='bio'
            placeholder='Small biography about you...'
            value={bio}
            onChange={onChange}
          />
        </Form.Group>

        <div className='button__form'>
          <Button type='submit'>Modify account</Button>
        </div>
      </Form>
    </div>
  )
}

export default ProfileSettings
