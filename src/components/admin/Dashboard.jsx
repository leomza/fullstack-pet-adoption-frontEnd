import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { Table } from 'react-bootstrap'
import UserTable from './UserTable'
import loadingDog from '../../assets/loadingDog.gif'
import AuthContext from '../../context/AuthContext'
import { url } from '../../config'

const Dashboard = () => {
  const [allUsers, setAllUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { currentUser } = useContext(AuthContext)

  useEffect(() => {
    setIsLoading(true)
    const getAllUsers = async () => {
      try {
        if (currentUser) {
          const res = await axios.get(
            `${url}/user/all/${currentUser._id}`,
            { withCredentials: true }
          )
          setAllUsers(res.data.allUsers)
          setIsLoading(false)
        }
      } catch (error) {
        console.error(error)
      }
    }
    getAllUsers()
  }, [currentUser])

  if (isLoading) {
    return (
      <div className='spinner__container'>
        <img className='spinner__image' src={loadingDog} alt='Loading...' />
      </div>
    )
  } else {
    return (
      <Table striped bordered hover size='sm'>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>Adopting or fostering pets?</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {allUsers &&
            allUsers.length > 0 &&
            allUsers.map(user => <UserTable key={user._id} {...{ user }} />)}
        </tbody>
      </Table>
    )
  }
}

export default Dashboard
