import '../assets/styles/navbar.scss'
import { svgIcons } from '../assets/svgs'
import { WalletContext } from '../context'
import { useContext, useState, ReactPropTypes } from 'react'
import { IUser } from '../interfaces'


const NexoLogo = svgIcons.nexoLogo
const SignOut = svgIcons.signOut
const UserIcon = svgIcons.userIcon

interface IModalProps {
    modalSwitch: boolean
    modalClick: (e?: React.MouseEvent) => void
}

const WarningModal = ({ modalSwitch, modalClick }: IModalProps) => {
    
    return (
        <div onClick={modalClick} className="sign-out-modal" style={{ display: modalSwitch ? 'block' : 'none' }}>
            <div className="modal-content">
                <h4>We currently do not support such feature</h4>
                <p>То fully dissconect please go to your Wallet and manually disconnect them from this page.</p>
            </div>
        </div>
    )
}

const Navbar = () => {

    const [modal, setModal] = useState(false)
    const { userData } = useContext(WalletContext)


    const userAdders = userData?.address

    return (
        <div className="nexo-navBar">
            <NexoLogo />
            <div className='navbar-container'>
                <div className='nav-user-container'>
                    <UserIcon />
                    <p className='nav-wallet-address'>
                        {userAdders || 'Not connected to any wallet'}
                    </p>
                    {userAdders && <button onClick={() => setModal(true)} className='nav-sign-in-btn' title="Disconnect your wallet"><SignOut /></button>}
                </div>
               
                <WarningModal modalClick={() => setModal(false)} modalSwitch={modal} />
            </div>
        </div>
    )
}

export default Navbar
