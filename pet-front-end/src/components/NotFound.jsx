import React from 'react'
import { Link } from 'react-router-dom'
import gifLanding from '../assets/gifLanding.gif'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { Button } from 'react-bootstrap'

const NotFound = () => {
  return (
    <div className='notFound__container'>
      <h1 className='notFound__title'>
        Oh no! The page are you looking for does not exist 😥
      </h1>
      <Button className='notFound__button' variant='success'>
        <Link className='notFound__redirect' to='/'>
          Go to the main page
          <FontAwesomeIcon id='iconHouse' icon={faHome} />
        </Link>
      </Button>
      <img className='notFound__image' src={gifLanding} alt='' />
    </div>
  )
}

export default NotFound
