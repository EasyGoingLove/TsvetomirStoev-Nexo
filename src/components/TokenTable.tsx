import '../assets/styles/tokenTable.scss'

import '../assets/styles/additionalinfo.scss'
import { svgIcons } from '../assets/svgs'
import { WalletContext , defaultTokenModalValues } from '../context'
import { useContext } from 'react'


const TokenTable = () => {

    const { tokenModal ,updateTokenModal } = useContext(WalletContext)


    if(!tokenModal.switchModal) {
        return null
    }

    return (
        <div className="token-modal" onClick={()=> updateTokenModal(defaultTokenModalValues)}>
            <div className="token-modal-content">
                <table id="customers">
                    <tbody>
                        <tr>
                            <th>Token Symbol</th>
                            <th>{tokenModal.tokenSymbol}</th>
                        </tr>
                        <tr>
                            <th>Decimals</th>
                            <th>{tokenModal.decimals}</th>
                        </tr>
                        <tr>
                            <th>Total Supply</th>
                            <th>{tokenModal.totalSupply}</th>
                        </tr>
                    </tbody>
                </table>

            </div>
        </div>
    )
}



export default TokenTable