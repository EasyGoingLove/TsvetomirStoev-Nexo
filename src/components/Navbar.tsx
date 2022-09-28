import '../assets/styles/navbar.scss'
import { useWeb3React } from "@web3-react/core";
import { svgIcons } from '../assets/svgs'
import { WalletContext } from '../context'
import { useContext } from 'react'


const NexoLogo = svgIcons.nexoLogo
const SignOut = svgIcons.signOut
const UserIcon = svgIcons.userIcon

const Navbar = () => {

    const { deactivate } = useWeb3React()
    const {userData} = useContext(WalletContext)

    const disconnect = async () => {
        try {
          await deactivate()
        } catch (err) {
          console.log(err);
        }
      }
    console.log(userData,'navbar');
    const userAdders = userData?.address

    return (
        <div className="nexo-navBar">
             <NexoLogo />
            <div style={{float: 'inline-end',display:'flex'}}>
                <div className='nav-user-container'>
                <UserIcon/>
                <p className='nav-wallet-address'>
                    {userAdders || 'Not connected to any wallet'}
                </p>
                </div>
                {userAdders && <button onClick={disconnect}  className='nav-sign-in-btn' title="Disconnect your wallet"><SignOut /></button>}
            </div>
        </div>
    )
}

Navbar.propTypes = {}

export default Navbar
