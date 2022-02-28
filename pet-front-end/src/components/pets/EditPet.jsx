import { useState, useContext, createRef, useEffect } from 'react'
import axios from 'axios'
import PetContext from '../../context/PetContext'
import AuthContext from '../../context/AuthContext'
import { Form, Col, Image, Button } from 'react-bootstrap'

const EditPet = ({ pet, handleClose }) => {
  const { setPetsArray } = useContext(PetContext)
  const { currentUser } = useContext(AuthContext)
  const fileInputRef = createRef()

  //State to NewAccount
  const [editPet, setEditPet] = useState({
    petType: pet.petType,
    petName: pet.petName,
    adoptionStatus: pet.adoptionStatus,
    picture: pet.picture,
    height: pet.height,
    weight: pet.weight,
    color: pet.color,
    bio: pet.bio,
    hypoallergenic: pet.hypoallergenic,
    dietaryRestrictions: pet.dietaryRestrictions,
    breed: pet.breed
  })
  const [petPicturePreview, setPetPicturePreview] = useState()
  const [petPicturePreviewURL, setPetPicturePreviewURL] = useState(
    `http://localhost:8000/images/${pet.picture}`
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
  } = editPet

  const onChange = e => {
    try {
      setEditPet({
        ...editPet,
        [e.target.name]: e.target.value
      })
    } catch (error) {
      console.error(error)
    }
  }

  //To set the value of the numbers
  const onChangeNumber = e => {
    try {
      setEditPet({
        ...editPet,
        [e.target.name]: e.target.valueAsNumber
      })
    } catch (error) {
      console.error(error)
    }
  }

  //To set the value of the checked input
  const onChangeChecked = e => {
    try {
      setEditPet({
        ...editPet,
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
        setEditPet({
          ...editPet,
          picture: file
        })
      }
    } catch (error) {
      console.error(error)
    }
  }

  //When the user wants to NewAccount
  const onSubmit = async e => {
    try {
      e.preventDefault()

      const fd = new FormData()
      fd.append('petType', editPet.petType)
      fd.append('petName', editPet.petName)
      fd.append('adoptionStatus', editPet.adoptionStatus)
      fd.append('height', editPet.height)
      fd.append('weight', editPet.weight)
      fd.append('color', editPet.color)
      fd.append('bio', editPet.bio)
      fd.append('hypoallergenic', editPet.hypoallergenic)
      fd.append('dietaryRestrictions', editPet.dietaryRestrictions)
      fd.append('breed', editPet.breed)
      fd.append('picture', editPet.picture)

      const res = await axios.put(
        `http://localhost:8000/pet/${pet._id}/${currentUser._id}`,
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
            checked={editPet.petType === 'dog' ? 'checked' : null}
          />
          <Form.Label htmlFor='petType'>Cat</Form.Label>
          <Form.Check
            type='radio'
            value='cat'
            onChange={onChange}
            name='petType'
            id='petType'
            checked={editPet.petType === 'cat' ? 'checked' : null}
          />
        </div>
      </Form.Group>

      <Form.Group as={Col}>
        <div className='d-flex'>
          <Form.Label htmlFor='adoptionStatus'>Adopted</Form.Label>
          <Form.Check
            type='radio'
            value='adopted'
            onChange={onChange}
            name='adoptionStatus'
            id='adoptionStatus'
            checked={editPet.adoptionStatus === 'adopted' ? 'checked' : null}
          />
          <Form.Label htmlFor='adoptionStatus'>Fostered</Form.Label>
          <Form.Check
            type='radio'
            value='fostered'
            onChange={onChange}
            name='adoptionStatus'
            id='adoptionStatus'
            checked={editPet.adoptionStatus === 'fostered' ? 'checked' : null}
          />
          <Form.Label htmlFor='adoptionStatus'>Available</Form.Label>
          <Form.Check
            type='radio'
            value='available'
            onChange={onChange}
            name='adoptionStatus'
            id='adoptionStatus'
            checked={editPet.adoptionStatus === 'available' ? 'checked' : null}
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
        />
      </Form.Group>

      <Form.Group as={Col}>
        <Form.Label htmlFor='breed'>Breed</Form.Label>
        <Form.Control
          className='w-100'
          type='text'
          value={breed}
          onChange={onChange}
          name='breed'
          id='breed'
          autoComplete='off'
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
          alt=''
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

export default EditPet
