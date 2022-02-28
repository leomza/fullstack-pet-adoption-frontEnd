import React from 'react'
import dogSlide1 from '../assets/dogSlide1.png'
import catSlide2 from '../assets/catSlide2.jpg'
import catAndDogSlide3 from '../assets/catAndDogSlide3.jpg'
import Carousel from 'react-bootstrap/Carousel'

const Home = () => {
  return (
    <Carousel variant='dark'>
      <Carousel.Item interval={4000}>
        <img className='carousel__image' src={dogSlide1} alt='Dog slide' />
        <Carousel.Caption>
          <h1 className='carousel__title'>
            Your best friend is waiting for you...
          </h1>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item interval={6000}>
        <img
          className='carousel__image image--cat'
          src={catSlide2}
          alt='Cat slide'
        />
        <Carousel.Caption>
          <h4 className='carousel__subtitle'>
            Welcome to a world where finding pet-friends has never been so easy,
            register your account and start a new adventure with the best
            company you could have
          </h4>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item interval={4000}>
        <img
          className='carousel__image'
          src={catAndDogSlide3}
          alt='Cat and Dog Slide'
        />
        <Carousel.Caption>
          <h1>You have not registered yet?</h1>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  )
}

export default Home
