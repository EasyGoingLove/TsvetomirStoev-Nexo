import '../assets/styles/userPage.scss'
import { svgIcons } from '../assets/svgs'
import { WalletContext } from '../context'
import { useContext } from 'react'
import { AdditionalInfo, TokenTable } from '../components'
import { getTokenData } from '../helpers/walletFunction'
import tokens from '../assets/wallet/tokens.json'

const MetamaskIcon = svgIcons.metamaskIcon
const EthereumIcon = svgIcons.ethereumIcon
const SmallNexoLogo = svgIcons.smallNexoIcon


const UserPage = () => {
    const { userData, updateTokenModal , updateLoader} = useContext(WalletContext)

    const showTokenData = async (tokenAddress: string) => {
        updateLoader(true)
        const [tokenSymbol, tokenDecimals, formatedTokenSupply]: any = await getTokenData(tokenAddress, userData.signer)
        updateLoader(false)
        updateTokenModal({
            tokenSymbol: tokenSymbol,
            decimals: tokenDecimals,
            totalSupply: formatedTokenSupply,
            switchModal: true
        })
    }
    const ethData = async () => {
        updateTokenModal({
            tokenSymbol: tokens[1].symbol,
            decimals: tokens[1].decimals,
            totalSupply: tokens[1].supply,
            switchModal: true
        })
    }


    return (
        <div className="userPage-wrapper">
            <div className="card">
                <div className="wallet-logo"><MetamaskIcon /></div>
                <div className="padding"></div>
                <h3 className="user-address">{userData?.address}</h3>
                <div className="title">{userData?.network}</div>
                <div className="actions">
                    <div className="follow-info" onClick={ethData}>
                        <EthereumIcon />
                        <div className='balance-container'>
                            <span>Balance</span>
                            <span>{userData?.ethereumBalance}</span>
                        </div>
                    </div>
                    <div className="follow-info" onClick={() => showTokenData(tokens[0].address)} >
                        <SmallNexoLogo />
                        <div className='balance-container'>
                            <span>Balance</span>
                            <span>{userData?.nexoBalance}</span>
                        </div>
                    </div>
                    <div className="swamp-btn"><button>Swamp</button></div>
                </div>
            </div>
            <AdditionalInfo />
            <TokenTable />
        </div>
    )
}

UserPage.propTypes = {}

export default UserPage