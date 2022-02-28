import { useState, createRef, useEffect, useContext } from 'react'
import axios from 'axios'
import { Form, Col, Image, Button } from 'react-bootstrap'
import PetContext from '../../context/PetContext'
import AuthContext from '../../context/AuthContext'

const AddPet = ({ handleClose }) => {
  const { setPetsArray } = useContext(PetContext)
  const { currentUser } = useContext(AuthContext)
  const fileInputRef = createRef()
  const [newPet, setNewPet] = useState({
    petType: '',
    petName: '',
    adoptionStatus: 'available',
    picture: '',
    height: '',
    weight: '',
    color: '',
    bio: '',
    hypoallergenic: '',
    dietaryRestrictions: '',
    breed: ''
  })
  const [petPicturePreview, setPetPicturePreview] = useState()
  const [petPicturePreviewURL, setPetPicturePreviewURL] = useState(
    `http://localhost:8000/images/generalPet.jpg`
  )

  const {
    petName,
    height,
    weight,
    color,
    bio,
    hypoallergenic,
    dietaryRestrictions,
    breed
  } = newPet

  const onChange = e => {
    try {
      setNewPet({
        ...newPet,
        [e.target.name]: e.target.value
      })
    } catch (error) {
      console.error(error)
    }
  }

  //To set the value of the numbers
  const onChangeNumber = e => {
    try {
      setNewPet({
        ...newPet,
        [e.target.name]: e.target.valueAsNumber
      })
    } catch (error) {
      console.error(error)
    }
  }

  //To set the value of the checked input
  const onChangeChecked = e => {
    try {
      setNewPet({
        ...newPet,
        [e.target.name]: e.target.checked
      })
    } catch (error) {
      console.error(error)
    }
  }

  //To set the value of the file
  const onChangeFile = e => {
    try {
      const file = e.target.files[0]
      if (file && file.type.substr(0, 5) === 'image') {
        setPetPicturePreview(file)
        setNewPet({
          ...newPet,
          picture: file
        })
      }
    } catch (error) {
      console.error(error)
    }
  }

  const onSubmit = async e => {
    try {
      e.preventDefault()

      const fd = new FormData()
      fd.append('petType', newPet.petType)
      fd.append('petName', newPet.petName)
      fd.append('adoptionStatus', newPet.adoptionStatus)
      fd.append('height', newPet.height)
      fd.append('weight', newPet.weight)
      fd.append('color', newPet.color)
      fd.append('bio', newPet.bio)
      fd.append('hypoallergenic', newPet.hypoallergenic)
      fd.append('dietaryRestrictions', newPet.dietaryRestrictions)
      fd.append('breed', newPet.breed)
      fd.append('picture', newPet.picture)

      const res = await axios.post(
        `http://localhost:8000/pet/${currentUser._id}`,
        fd
      )
      setPetsArray(res.data)
      handleClose()
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (petPicturePreview) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPetPicturePreviewURL(reader.result)
      }
      reader.readAsDataURL(petPicturePreview)
    }
  }, [petPicturePreview])

  return (
    <Form onSubmit={onSubmit}>
      <Form.Group as={Col}>
        <Form.Label htmlFor='petName'>Pet Name</Form.Label>
        <Form.Control
          className='w-100'
          type='text'
          value={petName}
          onChange={onChange}
          name='petName'
          id='petName'
          autoComplete='off'
          placeholder='The pet name...'
        />
      </Form.Group>

      <Form.Group as={Col}>
        <div className='d-flex'>
          <Form.Label htmlFor='petType'>Dog</Form.Label>
          <Form.Check
            type='radio'
            value='dog'
            onChange={onChange}
            name='petType'
            id='petType'
          />
          <Form.Label htmlFor='petType'>Cat</Form.Label>
          <Form.Check
            type='radio'
            value='cat'
            onChange={onChange}
            name='petType'
            id='petType'
          />
        </div>
      </Form.Group>

      <Form.Group as={Col}>
        <Form.Label htmlFor='height'>Height</Form.Label>
        <Form.Control
          className='w-100'
          type='number'
          value={height}
          onChange={onChangeNumber}
          name='height'
          id='height'
          autoComplete='off'
          min='0.5'
          step='0.1'
          placeholder='The pet height...'
        />
      </Form.Group>

      <Form.Group as={Col}>
        <Form.Label htmlFor='weight'>Weight</Form.Label>
        <Form.Control
          className='w-100'
          type='number'
          value={weight}
          onChange={onChangeNumber}
          name='weight'
          id='weight'
          autoComplete='off'
          min='0.5'
          step='0.1'
          placeholder='The pet weight...'
        />
      </Form.Group>

      <Form.Group as={Col}>
        <Form.Label htmlFor='color'>Color</Form.Label>
        <Form.Control
          className='w-100'
          type='text'
          value={color}
          onChange={onChange}
          name='color'
          id='color'
          autoComplete='off'
          placeholder='The pet color...'
        />
      </Form.Group>

      <Form.Group as={Col}>
        <Form.Label htmlFor='bio'>Biography</Form.Label>
        <Form.Control
          className='w-100'
          type='text'
          value={bio}
          onChange={onChange}
          name='bio'
          id='bio'
          autoComplete='off'
          placeholder='The pet biography...'
        />
      </Form.Group>

      <Form.Group as={Col}>
        <Form.Label htmlFor='hypoallergenic'>Hypoallergenic</Form.Label>
        <Form.Check
          type='checkbox'
          value={hypoallergenic}
          onChange={onChangeChecked}
          name='hypoallergenic'
          id='hypoallergenic'
        />
      </Form.Group>

      <Form.Group as={Col}>
        <Form.Label htmlFor='dietaryRestrictions'>
          Dietary Restrictions
        </Form.Label>
        <Form.Control
          className='w-100'
          type='text'
          value={dietaryRestrictions}
          onChange={onChange}
          name='dietaryRestrictions'
          id='dietaryRestrictions'
          autoComplete='off'
          placeholder='The pet dietary restrictions...'
        />
      </Form.Group>

      <Form.Group as={Col}>
        <Form.Label htmlFor='breed'>Breed</Form.Label>
        <Form.Control
          type='text'
          value={breed}
          onChange={onChange}
          name='breed'
          id='breed'
          autoComplete='off'
          placeholder='The pet breed...'
        />
      </Form.Group>

      <Form.Group as={Col}>
        <Form.Label htmlFor='picture'>Pet Picture</Form.Label>
        <Form.Control
          type='file'
          ref={fileInputRef}
          accept='image/*'
          onChange={onChangeFile}
          name='picture'
          id='picture'
        />
      </Form.Group>

      <div className='text-center mt-4'>
        <Image
          className='w-25'
          src={petPicturePreviewURL}
          alt='Preview Image'
          roundedCircle
        />
      </div>

      <div className='text-center mt-4'>
        <Button type='submit' onClick={onSubmit}>
          Submit
        </Button>
      </div>
    </Form>
  )
}

export default AddPet
