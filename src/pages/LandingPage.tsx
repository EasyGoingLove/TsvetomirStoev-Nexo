import '../assets/styles/landingPage.scss'
import { svgIcons } from '../assets/svgs'

const NexoIcon = svgIcons.nexoIcon

const LandingPage = () => {
    
  return (
    <div className='landing-pg-container'>
        <div className='icon-container'>
           <NexoIcon className='nexo-icon'/>
           <h2>
            The right place for your crypto adventures
            </h2>
        </div>
           <button>Connect with your Wallet</button>
    </div>
  )
}

LandingPage.propTypes = {}

export default LandingPage


