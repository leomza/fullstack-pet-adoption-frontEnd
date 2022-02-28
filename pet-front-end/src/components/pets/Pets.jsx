import { useContext, useState } from 'react'

import AddPet from './AddPet'
import PetCard from './PetCard'
import SearchPet from './SearchPet'
import loadingDog from '../../assets/loadingDog.gif'
import petNotFound from '../../assets/petNotFound.jpg'

import PetContext from '../../context/PetContext'
import AuthContext from '../../context/AuthContext'

import { Modal, Button, Row, Container } from 'react-bootstrap'
import axios from 'axios'
import backgroundDog from '../../assets/backgroundDog.jpg'

const Pets = () => {
  const { petsArray, isLoading, setIsLoading, setIsSearching } = useContext(
    PetContext
  )
  const { currentUser } = useContext(AuthContext)

  //State to show the modal or not
  const [showModal, setShow] = useState(false)
  const [tooglePets, setTooglePets] = useState(true)
  const [savedPets, setSavedPets] = useState([])

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const changeShowPets = async () => {
    try {
      if (tooglePets) {
        setIsLoading(true)
        setIsSearching(true)
        setTooglePets(false)
        const res = await axios.get(
          `http://localhost:8000/pet/user/${currentUser._id}`
        )
        setSavedPets(res.data)
        setIsLoading(false)
      } else {
        setTooglePets(true)
        setIsSearching(false)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const changeShowMyPets = async () => {
    try {
      if (tooglePets) {
        setIsLoading(true)
        setTooglePets(false)
        const res = await axios.get(
          `http://localhost:8000/pet/user/${currentUser._id}/owned`
        )
        setSavedPets(res.data)
        setIsLoading(false)
      } else {
        setTooglePets(true)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const sectionStyle = {
    backgroundImage: `url(${backgroundDog})`
  }

  let toShow = null
  if (tooglePets) {
    if (petsArray && petsArray.length > 0) {
      toShow = (
        <Container className='d-flex justify-content-center mt-4'>
          <Row xs={3}>
            {petsArray.map(pet => (
              <PetCard key={pet._id} {...{ pet }} />
            ))}
          </Row>
        </Container>
      )
    } else if (petsArray && petsArray.length === 0) {
      toShow = (
        <div className='notPets__container'>
          <h2>No pets to show</h2>
          <img
            className='notPets__image'
            src={petNotFound}
            alt='Pet not found'
          />
        </div>
      )
    }
  } else {
    if (savedPets && savedPets.length > 0) {
      toShow = (
        <Container className='d-flex justify-content-center mt-4'>
          <Row xs={3}>
            {savedPets.map(pet => (
              <PetCard key={pet._id} {...{ pet }} />
            ))}
          </Row>
        </Container>
      )
    } else if (savedPets && savedPets.length === 0) {
      toShow = (
        <div className='notPets__container'>
          <h2>No pets to show</h2>
          <img
            className='notPets__image'
            src={petNotFound}
            alt='Pet not found'
          />
        </div>
      )
    }
  }

  if (isLoading) {
    return (
      <div className='spinner__container'>
        <img className='spinner__image' src={loadingDog} alt='Loading...' />
      </div>
    )
  }
  return (
    <>
      <SearchPet className='pb-5' />

      <div className='button__pet--option'>
        {currentUser && currentUser.role === 'admin' ? (
          <Button onClick={handleShow}>Add Pet</Button>
        ) : null}
        {currentUser && currentUser.role === 'user' ? (
          <Button onClick={changeShowPets}>
            {tooglePets ? 'Saved Pets' : 'All Pets'}
          </Button>
        ) : null}
        {currentUser && currentUser.role === 'user' && tooglePets ? (
          <Button onClick={changeShowMyPets}>My pets</Button>
        ) : null}
      </div>

      <Modal
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'
        centered
        show={showModal}
        onHide={handleClose}
      >
        <Modal.Header style={sectionStyle} closeButton>
          <Modal.Title>
            <h1>Add a pet</h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddPet {...{ handleClose }} />
        </Modal.Body>
      </Modal>

      {toShow}
    </>
  )
}
export default Pets
