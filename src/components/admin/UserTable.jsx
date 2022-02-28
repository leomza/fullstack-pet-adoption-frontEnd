import { useEffect, useState } from 'react'
import axios from 'axios'
import PetCard from '../pets/PetCard'
import { Modal } from 'react-bootstrap'
import swal from 'sweetalert'
import { url } from '../../config'

const UserTable = ({ user }) => {
  const [containPet, setContainPet] = useState(false)
  const [userPets, setUserPets] = useState([])
  const [showModal, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  useEffect(() => {
    if (user.adoptedPets.length > 0 || user.fosteredPets.length > 0) {
      setContainPet(true)
    } else {
      setContainPet(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    async function searchUserPets () {
      try {
        const res = await axios.get(
          `${url}/pet/user/${user._id}/owned`
        )
        setUserPets(res.data)
      } catch (error) {
        console.error(error)
      }
    }
    searchUserPets()
  }, [user._id])

  const changeUserRole = async userRole => {
    try {
      const res = await axios.put(
        `${url}/user/${user._id}/changeRole`,
        { userRole }
      )
      swal('Guauuuuu', res.data.message, 'success')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <tr>
        <td>{user.firstName}</td>
        <td>{user.lastName}</td>
        <td>{user.phoneNumber} </td>
        <td>{user.email}</td>
        <td className='table__pet' onClick={handleShow}>
          {containPet ? 'Yes' : 'No'}
        </td>
        <td
          onChange={() => {
            changeUserRole(user.role)
          }}
        >
          <select name='role' id='role' defaultValue={user.role}>
            <option value='admin'>Admin</option>
            <option value='user'>User</option>
          </select>
        </td>
      </tr>

      <Modal
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'
        centered
        show={showModal}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <h1>
              {user.firstName} {user.lastName}'s Pets
            </h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {userPets &&
            userPets.length > 0 &&
            userPets.map(pet => <PetCard key={pet._id} {...{ pet }} />)}
        </Modal.Body>
      </Modal>
    </>
  )
}

export default UserTable
