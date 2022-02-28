import React, { useState, useEffect } from 'react'
import NavBar from './components/NavBar'

import PetContext from './context/PetContext'
import AuthContext from './context/AuthContext'

import axios from 'axios'
import Cookies from 'js-cookie'
import swal from 'sweetalert'
import { useNavigate } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'
import AboutUs from './components/AboutUs'
import NotFound from './components/NotFound'
import PetInfo from './components/pets/PetInfo'
import Dashboard from './components/admin/Dashboard'
import ProfileSettings from './components/auth/ProfileSettings'
import Pets from './components/pets/Pets'
import Home from './components/Home'
import Contact from './components/Contact'

function App () {
  const navigate = useNavigate()
  /* ----------PETS----------------- */
  const [petsArray, setPetsArray] = useState([])
  const [searcher, setSearcher] = useState({
    adoptionStatus: '',
    petType: '',
    minHeight: '',
    maxHeight: '',
    minWeight: '',
    maxWeight: '',
    petName: ''
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isSearching, setIsSearching] = useState(false)

  useEffect(() => {
    async function getAllPets () {
      try {
        setIsLoading(true)
        setIsSearching(false)
        const res = await axios.get(
          `http://localhost:8000/pet/?adoptionStatus=${searcher.adoptionStatus}&petType=${searcher.petType}&minHeight=${searcher.minHeight}&maxHeight=${searcher.maxHeight}&minWeight=${searcher.minWeight}&maxWeight=${searcher.maxWeight}&petName=${searcher.petName}`,
          { withCredentials: true }
        )
        setPetsArray(res.data)
        setIsLoading(false)
      } catch (error) {
        console.error(error)
      }
    }
    getAllPets()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function deletePet (petId) {
    try {
      const allPets = [...petsArray]
      const deletedArray = allPets.filter(pet => pet._id !== petId)
      setPetsArray(deletedArray)
    } catch (error) {
      console.error(error)
    }
  }

  function savePet (petId) {
    try {
      if (!currentUser.savedPets.includes(petId)) {
        const user = { ...currentUser }
        user.savedPets.push(petId)
        setCurrentUser(user)
      }
    } catch (error) {
      console.error(error)
    }
  }

  function unsavePet (petId) {
    try {
      if (currentUser.savedPets.includes(petId)) {
        const user = { ...currentUser }
        const indexRemove = currentUser.savedPets.findIndex(
          element => element === petId
        )
        user.savedPets.splice(indexRemove, 1)
        setCurrentUser(user)
      }
    } catch (error) {
      console.error(error)
    }
  }

  function adoptPet (petId) {
    try {
      if (!currentUser.adoptedPets.includes(petId)) {
        const user = { ...currentUser }
        user.adoptedPets.push(petId)
        setCurrentUser(user)
        const allPets = [...petsArray]
        let findPet = allPets.find(pet => pet._id === petId)
        findPet.adoptionStatus = 'adopted'
        setPetsArray(allPets)
      }
    } catch (error) {
      console.error(error)
    }
  }

  function fosterPet (petId) {
    try {
      if (!currentUser.fosteredPets.includes(petId)) {
        const user = { ...currentUser }
        user.fosteredPets.push(petId)
        setCurrentUser(user)
        const allPets = [...petsArray]
        let findPet = allPets.find(pet => pet._id === petId)
        findPet.adoptionStatus = 'fostered'
        setPetsArray(allPets)
      }
    } catch (error) {
      console.error(error)
    }
  }

  function returnPet (petId) {
    try {
      const user = { ...currentUser }
      if (currentUser.adoptedPets.includes(petId)) {
        const indexRemove = currentUser.adoptedPets.findIndex(
          element => element === petId
        )
        user.adoptedPets.splice(indexRemove, 1)
        setCurrentUser(user)
      } else if (currentUser.fosteredPets.includes(petId)) {
        const indexRemove = currentUser.fosteredPets.findIndex(
          element => element === petId
        )
        user.fosteredPets.splice(indexRemove, 1)
        setCurrentUser(user)
      }
      const allPets = [...petsArray]
      let findPet = allPets.find(pet => pet._id === petId)
      findPet.adoptionStatus = 'available'
      setPetsArray(allPets)
    } catch (error) {
      console.error(error)
    }
  }

  /* ----------USERS----------------- */
  //Create a state to know what to render if the user is logged in or not
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    async function keepAuthenticate () {
      try {
        const cookie = Cookies.get('token')
        if (cookie) {
          const res = await axios.get('http://localhost:8000/user', {
            withCredentials: true
          })
          setCurrentUser(res.data.user)
        }
      } catch (error) {
        console.error(error)
      }
    }
    keepAuthenticate()
  }, [])

  const logout = () => {
    try {
      swal({
        title: 'Logout?',
        icon: 'warning',
        buttons: true,
        dangerMode: true
      }).then(positive => {
        if (positive) {
          setCurrentUser(null)
          Cookies.remove('token')
          navigate('/')
        }
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, logout }}>
      <PetContext.Provider
        value={{
          setPetsArray,
          petsArray,
          deletePet,
          searcher,
          setSearcher,
          setIsLoading,
          isLoading,
          savePet,
          unsavePet,
          adoptPet,
          fosterPet,
          returnPet,
          isSearching,
          setIsSearching
        }}
      >
        <NavBar />

        <Routes>
          <Route path='/aboutUs' element={<AboutUs />} />
          <Route path='/' element={<Home />} />
          <Route
            path='/profileSettings'
            element={
              <PrivateRoute redirectTo='/'>
                <ProfileSettings />
              </PrivateRoute>
            }
          />
          <Route
            path='/dashboard'
            element={
              <PrivateRoute redirectTo='/'>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path='/contactUs'
            element={
              <PrivateRoute redirectTo='/'>
                <Contact />
              </PrivateRoute>
            }
          />
          <Route path='/pets' element={<Pets />} />
          <Route path='/petInfo/:petId' element={<PetInfo />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </PetContext.Provider>
    </AuthContext.Provider>
  )
}

export default App
