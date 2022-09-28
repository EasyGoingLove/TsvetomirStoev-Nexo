import '../assets/styles/userPage.scss'
import { svgIcons } from '../assets/svgs'
import { WalletContext } from '../context'
import { useContext } from 'react'






const MetamaskIcon = svgIcons.metamaskIcon

const UserPage = () => {

    const {userData} = useContext(WalletContext)

    return (
        <div className="userPage-wrapper">
            <div className="card">
                <div className="banner"><MetamaskIcon /></div>
                <div className="padding"></div>
                <h3 className="user-address">{userData?.address}</h3>
                <div className="title">{userData?.network}</div>
                <div className="actions">
                    <div className="follow-info">
                        <h2><a href="#"><span>12</span><small>Followers</small></a></h2>
                        <h2><a href="#"><span>1000</span><small>Following</small></a></h2>
                    </div>
                    <div className="follow-btn"><button>Follow</button></div>
                </div>

            </div>
        </div>
    )
}

UserPage.propTypes = {}

export default UserPage