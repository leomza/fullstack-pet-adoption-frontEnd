import React, { useRef } from 'react'
import emailjs from 'emailjs-com'
import { Form, Col, Button } from 'react-bootstrap'
import swal from 'sweetalert'

const Contact = () => {
  const form = useRef()

  const sendEmail = e => {
    e.preventDefault()

    emailjs
      .sendForm(
        'gmail',
        'form-contacto',
        form.current,
        'user_mHF4GYlUxWVzTajf6ADhY'
      )
      .then(
        () => {
          swal(
            'Thanks to contact us!',
            'As soon as we can we will reply to your email',
            'success'
          )
          form.current[0].value = ''
          form.current[1].value = ''
          form.current[2].value = ''
        },
        error => {
          swal('Ohhh nooo!', `${error.text}`, 'error')
          console.log(error.text)
        }
      )
  }

  return (
    <>
      <h1 className='text-center mt-5 mb-4'>Please contact us</h1>

      <Form className='w-50 pb-5 form__contact' ref={form} onSubmit={sendEmail}>
        <Form.Group as={Col}>
          <Form.Label htmlFor='user_email'>User Email</Form.Label>
          <Form.Control
            type='email'
            name='user_email'
            id='user_email'
            autoComplete='off'
            placeholder='Your email...'
            required
          />
        </Form.Group>

        <Form.Group as={Col}>
          <Form.Label htmlFor='subject'>Subject</Form.Label>
          <Form.Control
            type='text'
            name='subject'
            id='subject'
            autoComplete='off'
            placeholder='Your name...'
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor='message'>Message</Form.Label>
          <Form.Control
            as='textarea'
            rows={3}
            name='message'
            id='message'
            placeholder='Your message...'
            required
          />
        </Form.Group>

        <div className='text-center mt-4'>
          <Button type='submit'>Send</Button>
        </div>
      </Form>
    </>
  )
}

export default Contact
