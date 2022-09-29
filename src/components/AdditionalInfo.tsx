import '../assets/styles/additionalinfo.scss'
import { svgIcons } from '../assets/svgs'
import { WalletContext } from '../context'
import { useContext } from 'react'

const MetamaskIcon = svgIcons.metamaskIcon
const EthereumIcon = svgIcons.ethereumIcon
const SmallNexoLogo = svgIcons.smallNexoIcon


const AdditionalInfo = () => {

    const { userData  } = useContext(WalletContext)

    return (
            <div className="adt-info-card">
                <h2 className="add-info-header">More Tokens & Information</h2>
                <hr/>
                <h4 className="add-info-header">INPUT "Contract Address" OF TOKEN YOU WANT TO SEE</h4>
                <input type="text" placeholder='Tokens Contract Address' className="address-input" />
                <div className='get-address-btn'><button >Get Token</button></div>
                <hr/>
                <h4 className="add-info-header">TOKENS WE FOUND IN YOUR WALLET</h4>
            </div>
    )
}


export default AdditionalInfo