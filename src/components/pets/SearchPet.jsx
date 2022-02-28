import { useState, useContext } from 'react'

import PetContext from '../../context/PetContext'
import { Form, Col, Button } from 'react-bootstrap'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faDog, faCat } from '@fortawesome/free-solid-svg-icons'
import { url } from '../../config'

const SearchPet = () => {
  const { searcher, setSearcher, setPetsArray, setIsSearching } = useContext(
    PetContext
  )
  const [advanceSearch, setAdvanceSearch] = useState(false)

  //Extract de email and password from a user
  const { minHeight, maxHeight, minWeight, maxWeight, petName } = searcher

  const onChange = e => {
    setSearcher({
      ...searcher,
      [e.target.name]: e.target.value
    })
  }

  //To set the value of the numbers
  const onChangeNumber = e => {
    setSearcher({
      ...searcher,
      [e.target.name]: e.target.valueAsNumber
    })
  }

  const restartFilter = () => {
    setSearcher({
      adoptionStatus: '',
      petType: '',
      minHeight: '',
      maxHeight: '',
      minWeight: '',
      maxWeight: '',
      petName: ''
    })
  }

  const onSubmit = async e => {
    try {
      e.preventDefault()
      setIsSearching(false)
      for (let objectValue in searcher) {
        if (searcher[objectValue] !== '') {
          setIsSearching(true)
        }
      }
      const res = await axios.get(
        `${url}/pet/?adoptionStatus=${searcher.adoptionStatus}&petType=${searcher.petType}&minHeight=${searcher.minHeight}&maxHeight=${searcher.maxHeight}&minWeight=${searcher.minWeight}&maxWeight=${searcher.maxWeight}&petName=${searcher.petName}`,
        { withCredentials: true }
      )
      setPetsArray(res.data)
      restartFilter()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Form className='form__search text-center pb-3' onSubmit={onSubmit}>
      <h3>
        Search a Pet <FontAwesomeIcon icon={faSearch} />
      </h3>

      <Form.Group as={Col}>
        <div className='d-flex justify-content-center'>
          <Form.Label htmlFor='petType'>
            <FontAwesomeIcon icon={faDog} title='Dog' />
          </Form.Label>
          <Form.Check
            type='radio'
            value='dog'
            onChange={onChange}
            name='petType'
            checked={searcher.petType === 'dog' ? 'checked' : ''}
          />
          <Form.Label className='form__label--cat' htmlFor='petType'>
            <FontAwesomeIcon icon={faCat} title='cat' />
          </Form.Label>
          <Form.Check
            type='radio'
            value='cat'
            onChange={onChange}
            name='petType'
            checked={searcher.petType === 'cat' ? 'checked' : ''}
          />
        </div>
      </Form.Group>

      {advanceSearch ? (
        <>
          <Form.Group className='form__container--group' as={Col}>
            <Form.Control
              type='text'
              value={petName}
              onChange={onChange}
              name='petName'
              id='petName'
              autoComplete='off'
              placeholder='Pet Name'
            />
          </Form.Group>

          <div className="d-flex params__container">
            <Form.Group as={Col}>
              <Form.Control
                type='number'
                value={minHeight}
                onChange={onChangeNumber}
                name='minHeight'
                id='minHeight'
                autoComplete='off'
                min='1'
                placeholder='Min height'
              />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Control
                type='number'
                value={maxHeight}
                onChange={onChangeNumber}
                name='maxHeight'
                id='maxHeight'
                autoComplete='off'
                min='1'
                placeholder='Max height'
              />
            </Form.Group>
          </div>

          <div className="d-flex params__container">
            <Form.Group as={Col}>
              <Form.Control
                type='number'
                value={minWeight}
                onChange={onChangeNumber}
                name='minWeight'
                id='minWeight'
                autoComplete='off'
                min='1'
                placeholder='Min weight'
              />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Control
                type='number'
                value={maxWeight}
                onChange={onChangeNumber}
                name='maxWeight'
                id='maxWeight'
                autoComplete='off'
                min='1'
                placeholder='Max weight'
              />
            </Form.Group>
          </div>

          <Form.Group as={Col}>
            <div className='d-flex justify-content-center'>
              <Form.Label htmlFor='adoptionStatus'>Adopted</Form.Label>
              <Form.Check
                type='radio'
                value='adopted'
                onChange={onChange}
                name='adoptionStatus'
                checked={searcher.adoptionStatus === 'adopted' ? 'checked' : ''}
              />
              <Form.Label htmlFor='adoptionStatus'>Fostered</Form.Label>
              <Form.Check
                type='radio'
                value='fostered'
                onChange={onChange}
                name='adoptionStatus'
                checked={
                  searcher.adoptionStatus === 'fostered' ? 'checked' : ''
                }
              />
              <Form.Label htmlFor='adoptionStatus'>Available</Form.Label>
              <Form.Check
                type='radio'
                value='available'
                onChange={onChange}
                name='adoptionStatus'
                checked={
                  searcher.adoptionStatus === 'available' ? 'checked' : ''
                }
              />
            </div>
          </Form.Group>
        </>
      ) : null}

      <div className='search__button--container'>
        <Button variant='success' type='submit' onClick={onSubmit}>
          Search
        </Button>

        {advanceSearch ? (
          <Button
            variant='secondary'
            type='submit'
            onClick={() => {
              setAdvanceSearch(false)
            }}
          >
            Basic Search
          </Button>
        ) : (
          <Button
            variant='secondary'
            type='submit'
            onClick={() => {
              setAdvanceSearch(true)
            }}
          >
            Advance Search
          </Button>
        )}

        <Button variant='warning' type='submit' onClick={restartFilter}>
          Restart Filter
        </Button>
      </div>
    </Form>
  )
}

export default SearchPet
