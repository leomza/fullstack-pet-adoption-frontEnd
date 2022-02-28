import React, { useState, useContext } from 'react'

import Login from '../components/auth/Login'
import NewAccount from '../components/auth/NewAccount'

import AuthContext from '../context/AuthContext'

import { Navbar, Nav, NavDropdown, Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPaw,
  faIdCard,
  faUsers,
  faDog,
  faUserCog,
  faSignOutAlt,
  faChartLine,
  faEnvelopeOpenText
} from '@fortawesome/free-solid-svg-icons'
import backgroundDog from '../assets/backgroundDog.jpg'

const NavBar = () => {
  //Use the function "logout" from authContext
  const { logout, currentUser } = useContext(AuthContext)

  //State to show the modal or not
  const [showModal, setShow] = useState(false)
  //State to show the Login Modal or the New Account Modal
  const [showLogin, setShowLogin] = useState(true)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const changeModal = () => setShowLogin(!showLogin)

  const titleDropDown = (
    <FontAwesomeIcon
      className='navBar__icon'
      icon={faIdCard}
      title='Profile Settings'
    />
  )

  const sectionStyle = {
    backgroundImage: `url(${backgroundDog})`
  }

  return (
    <>
      <Navbar bg='dark' variant='dark' expand='lg' sticky='top'>
        <Navbar.Brand>
          <Link to='/'>
            Home
            <FontAwesomeIcon
              className='navBar__icon'
              icon={faPaw}
              title='Go Home'
            />
          </Link>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            <Link to='/aboutUs'>
              Who we are?
              <FontAwesomeIcon className='navBar__icon' icon={faUsers} />
            </Link>
            <Link to='/pets'>
              Pets List
              <FontAwesomeIcon className='navBar__icon' icon={faDog} />
            </Link>
            {currentUser && currentUser.role === 'admin' ? (
              <Link to='/dashboard'>
                Dashboard
                <FontAwesomeIcon className='navBar__icon' icon={faChartLine} />
              </Link>
            ) : null}

            {currentUser && currentUser.role === 'user' ? (
              <Link to='/contactUs'>
                Contact Us
                <FontAwesomeIcon className='navBar__icon' icon={faEnvelopeOpenText} />
              </Link>
            ) : null}

            <NavDropdown title={titleDropDown} id='basic-nav-dropdown'>
              {currentUser ? (
                <Link className='navDropdown__profile' to='/profileSettings'>
                  Profile Settings
                  <FontAwesomeIcon className='navBar__icon' icon={faUserCog} />
                </Link>
              ) : null}
              {!currentUser ? (
                <NavDropdown.Item onClick={handleShow}>Login</NavDropdown.Item>
              ) : (
                <NavDropdown.Item onClick={logout}>
                  Logout
                  <FontAwesomeIcon
                    className='navBar__icon'
                    icon={faSignOutAlt}
                  />
                </NavDropdown.Item>
              )}
            </NavDropdown>

            {currentUser ? (
              <Nav.Link id='titleName'>
                Hello {currentUser.firstName} {currentUser.lastName}!
              </Nav.Link>
            ) : null}
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Modal
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'
        centered
        show={showModal}
        onHide={handleClose}
      >
        <Modal.Header style={sectionStyle} closeButton>
          <Modal.Title>
            {showLogin ? (
              <h1>Log in your account</h1>
            ) : (
              <h1>Create an account</h1>
            )}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {showLogin ? (
            <Login {...{ changeModal, handleClose }} />
          ) : (
            <NewAccount {...{ changeModal, handleClose }} />
          )}
        </Modal.Body>
      </Modal>
    </>
  )
}

export default NavBar
