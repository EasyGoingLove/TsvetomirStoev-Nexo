import '../assets/styles/userPage.scss'
import { svgIcons } from '../assets/svgs'
import { WalletContext } from '../context'
import { useContext } from 'react'

const MetamaskIcon = svgIcons.metamaskIcon
const EthereumIcon = svgIcons.ethereumIcon
const NexoLogo = svgIcons.nexoIcon


const UserPage = () => {

    const { userData  } = useContext(WalletContext)

    return (
        <div className="userPage-wrapper">
            <div className="card">
                <div className="wallet-logo"><MetamaskIcon /></div>
                <div className="padding"></div>
                <h3 className="user-address">{userData?.address}</h3>
                <div className="title">{userData?.network}</div>
                <div className="actions">
                    <div className="follow-info">
                        <EthereumIcon />
                        <div className='balance-container'>
                            <span>Balance</span>
                            <span>{userData?.ethereumBalance}</span>
                        </div>
                    </div>
                    <div className="follow-info">
                        <NexoLogo />
                        <div className='balance-container'>
                        <span>Balance</span>
                            <span>{userData?.nexoBalance}</span>
                        </div>
                    </div>
                    <div className="swamp-btn"><button>Swamp</button></div>
                </div>

            </div>
        </div>
    )
}

UserPage.propTypes = {}

export default UserPage