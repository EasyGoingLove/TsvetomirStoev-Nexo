import '../assets/styles/navbar.scss'
import { svgIcons } from '../assets/svgs'

const NexoLogo = svgIcons.nexoLogo
const SignIn = svgIcons.signIn

const Navbar = () => {
    return (
        <div className="nexo-navBar">
             <NexoLogo />
            <div style={{float: 'inline-end'}}>
                <SignIn />
            </div>
        </div>
    )
}

Navbar.propTypes = {}

export default Navbar