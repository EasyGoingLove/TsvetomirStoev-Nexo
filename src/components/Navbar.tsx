import '../assets/styles/navbar.scss'
import { svgIcons } from '../assets/svgs'

const NexoLogo = svgIcons.nexoLogo

const Navbar = () => {
  return (
    <div className="nexo-navBar"><NexoLogo/></div>
  )
}

Navbar.propTypes = {}

export default Navbar