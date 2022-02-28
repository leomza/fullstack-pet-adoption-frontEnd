import Carousel from 'react-bootstrap/Carousel'
import petWorking from '../assets/petWorking.jpg'
import pictureTeam from '../assets/pictureTeam.jpg'
import { SocialIcon } from 'react-social-icons'

const AboutUs = () => {
  return (
    <Carousel variant='dark'>
      <Carousel.Item>
        <img
          className='carousel__image image--petWorking'
          src={petWorking}
          alt='First slide'
        />
        <Carousel.Caption id='aboutUsContainer'>
          <h1>
            About the <em>company</em>
          </h1>
          <ul>
            <li>
              TuMascota was born in 2021 due to the lack of alternatives to help
              the abandonment of dogs and cats in the world
            </li>
            <li>
              Because the government exterminates them and the shelters are
              overcrowded and have very bad care
            </li>
            <li>
              Avoid going through those places that often represent your
              mistreatment and death
            </li>
          </ul>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className='carousel__image image--team'
          src={pictureTeam}
          alt='Second slide'
        />
        <Carousel.Caption>
          <h1>
            Our <em>single</em> team
          </h1>
          <p className='description__team'>
            Our amazing Full Stack Developer is a programming lover, he has two
            degrees (one in Management and one in Accounting), but coding is
            something that is his passion, he loves do it!
          </p>
          <p>You can contact him, he would love to hear about you:</p>
          <div className='socialMedia__team--container'>
            <SocialIcon url='https://linkedin.com/in/leodeve' />
            <SocialIcon url='https://github.com/leomza' />
            <SocialIcon url='mailto:leo.stackdev@gmail.com' />
          </div>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  )
}

export default AboutUs
