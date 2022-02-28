import { useState, useEffect } from 'react'
import axios from 'axios'
import { Card, Button } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import loadingDog from '../../assets/loadingDog.gif'
import { url } from '../../config'

const PetInfo = () => {
  const navigate = useNavigate()
  const { petId } = useParams()
  const [foundPet, setFoundPet] = useState()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function searchPet () {
      try {
        const res = await axios.get(`${url}/pet/${petId}`)
        setFoundPet(res.data.pet)
        setIsLoading(false)
      } catch (error) {
        console.error(error)
      }
    }
    searchPet()
  }, [petId])

  if (isLoading) {
    return (
      <div className='spinner__container'>
        <img className='spinner__image' src={loadingDog} alt='Loading...' />
      </div>
    )
  } else {
    return (
      <div className='petInfo__container'>
        <Card style={{ width: '18rem' }}>
          <Card.Img
            variant='top'
            src={`${url}/images/${foundPet.picture}`}
          />
          <Card.Body>
            <Card.Title>Name: {foundPet.petName}</Card.Title>
            <Card.Text>
              <b>Type:</b> {foundPet.petType}
            </Card.Text>
            <Card.Text>
              <b>Height:</b> {foundPet.height}
            </Card.Text>
            <Card.Text>
              <b>Weight:</b> {foundPet.weight}
            </Card.Text>
            <Card.Text>
              <b>Dietary Restrictions:</b> {foundPet.dietaryRestrictions}
            </Card.Text>
            <Card.Text>
              <b>Color:</b> {foundPet.color}
            </Card.Text>
            <Card.Text>
              <b>Breed:</b> {foundPet.breed}
            </Card.Text>
            <Card.Text>
              <b>Hypoallergenic:</b>
              {foundPet.hypoallergenic === true ? 'Yes' : 'No'}
            </Card.Text>
            <Card.Text>
              <b>Biography:</b> {foundPet.bio}
            </Card.Text>
          </Card.Body>
          <Button
            variant='primary'
            onClick={() => {
              navigate('/pets')
            }}
          >
            Go back
          </Button>
        </Card>
      </div>
    )
  }
}

export default PetInfo
