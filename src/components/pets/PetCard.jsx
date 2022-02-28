import { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { Modal, Button, Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

import EditPet from './EditPet'

import AuthContext from '../../context/AuthContext'
import PetContext from '../../context/PetContext'
import swal from 'sweetalert'
import backgroundDog from '../../assets/backgroundDog.jpg'
import { url } from '../../config'

const PetCard = ({ pet }) => {
  const {
    deletePet,
    savePet,
    unsavePet,
    adoptPet,
    fosterPet,
    returnPet,
    isSearching
  } = useContext(PetContext)
  const navigate = useNavigate()
  const { currentUser } = useContext(AuthContext)
  const [savedPet, setSavedPet] = useState(false)
  const [adoptedPet, setAdoptedPet] = useState(false)
  const [fosteredPet, setFosteredPet] = useState(false)

  useEffect(
    () => {
      if (currentUser) {
        if (currentUser.savedPets.includes(pet._id)) {
          setSavedPet(false)
        } else {
          setSavedPet(true)
        }

        if (currentUser.adoptedPets.includes(pet._id)) {
          setAdoptedPet(true)
        } else {
          setAdoptedPet(false)
        }

        if (currentUser.fosteredPets.includes(pet._id)) {
          setFosteredPet(true)
        } else {
          setFosteredPet(false)
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentUser]
  )

  //State to show the modal or not
  const [showModal, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const sectionStyle = {
    backgroundImage: `url(${backgroundDog})`
  }

  async function handleDeletePet (e) {
    try {
      e.preventDefault()
      swal({
        title: 'Delete, are you sure?',
        icon: 'warning',
        buttons: true,
        dangerMode: true
      }).then(positive => {
        if (positive) {
          const res = axios.delete(`${url}/pet/${pet._id}`, {
            withCredentials: true
          })
          if (res) {
            deletePet(pet._id)
          }
        }
      })
    } catch (error) {
      console.error(error)
    }
  }

  async function handleSavePet (e) {
    try {
      e.preventDefault()
      const userId = currentUser._id
      const res = await axios.post(
        `${url}/pet/${pet._id}/save`,
        { userId },
        { withCredentials: true }
      )
      if (res) {
        savePet(pet._id)
      }
    } catch (error) {
      console.error(error)
    }
  }

  async function handleUnsavePet (e) {
    try {
      e.preventDefault()
      const userId = currentUser._id
      const res = await axios.post(
        `${url}/pet/${pet._id}/unsave`,
        { userId },
        { withCredentials: true }
      )
      if (res) {
        unsavePet(pet._id)
      }
    } catch (error) {
      console.error(error)
    }
  }

  async function handleAdoptFosterPet (e, adoptionStatus) {
    try {
      e.preventDefault()
      const userId = currentUser._id
      const res = await axios.post(
        `${url}/pet/${pet._id}/adopt`,
        { userId, adoptionStatus },
        { withCredentials: true }
      )
      if (res) {
        if (adoptionStatus === 'adopted') {
          adoptPet(pet._id)
        } else if (adoptionStatus === 'fostered') {
          fosterPet(pet._id)
        }
      }
    } catch (error) {
      console.error(error)
    }
  }

  async function handleReturnPet (e) {
    try {
      e.preventDefault()
      const userId = currentUser._id
      const res = await axios.post(
        `${url}/pet/${pet._id}/return`,
        { userId },
        { withCredentials: true }
      )
      if (res) {
        returnPet(pet._id)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Card style={{ width: '18rem' }} className='m-4 pt-4'>
      <Card.Img
        variant='top'
        src={`${url}/images/${pet.picture}`}
      />
      <Card.Body>
        <Card.Title className='text-capitalize'>{pet.petName}</Card.Title>
        <Card.Text className='text-uppercase'>{pet.adoptionStatus}</Card.Text>
        <div className='petCard__button__container'>
          <Button
            variant='primary'
            onClick={() => {
              navigate(`/petInfo/${pet._id}`)
            }}
          >
            Show more
          </Button>

          {currentUser && currentUser.role === 'admin' ? (
            <Button variant='warning' onClick={handleShow}>
              Edit
            </Button>
          ) : null}

          <Modal
            size='lg'
            aria-labelledby='contained-modal-title-vcenter'
            centered
            show={showModal}
            onHide={handleClose}
          >
            <Modal.Header style={sectionStyle} closeButton>
              <Modal.Title>
                <h1>Edit a pet</h1>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <EditPet {...{ pet, handleClose }} />
            </Modal.Body>
          </Modal>

          {currentUser && currentUser.role === 'admin' ? (
            <Button variant='danger' onClick={handleDeletePet}>
              Delete
            </Button>
          ) : null}

          {currentUser &&
          currentUser.role === 'user' &&
          savedPet &&
          !isSearching ? (
            <Button variant='success' onClick={handleSavePet}>
              Save Pet
            </Button>
          ) : null}

          {currentUser && currentUser.role === 'user' && !savedPet ? (
            <Button variant='warning' onClick={handleUnsavePet}>
              Unsave Pet
            </Button>
          ) : null}

          {currentUser &&
          currentUser.role === 'user' &&
          !adoptedPet &&
          !isSearching ? (
            <Button
              variant='success'
              onClick={e => handleAdoptFosterPet(e, 'adopted')}
            >
              Adopt Pet
            </Button>
          ) : null}

          {currentUser &&
          currentUser.role === 'user' &&
          !fosteredPet &&
          !adoptedPet &&
          !isSearching ? (
            <Button
              variant='success'
              onClick={e => handleAdoptFosterPet(e, 'fostered')}
            >
              Foster Pet
            </Button>
          ) : null}

          {currentUser &&
          currentUser.role === 'user' &&
          (fosteredPet || adoptedPet) ? (
            <Button variant='danger' onClick={handleReturnPet}>
              Return Pet
            </Button>
          ) : null}
        </div>
      </Card.Body>
    </Card>
  )
}

export default PetCard
