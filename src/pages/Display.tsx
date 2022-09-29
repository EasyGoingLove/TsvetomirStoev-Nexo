import { WalletContext, defaultUserValues } from '../context'
import { useContext } from 'react'
import LandingPage from './LandingPage'
import UserPage from './UserPage'
import { MainNetAlert } from '../components'

import { getWalletnData } from '../helpers/walletFunction'

const Display = () => {

    const { userData, updateUserData, updateMainnetAlert } = useContext(WalletContext)
    const userAdders = userData?.address

    if (typeof window.ethereum !== 'undefined') {
        window.ethereum.on('accountsChanged', async function (wallet: string[]) {
            if (!wallet.length) {
                updateUserData(defaultUserValues)
            } else {
                const newWalletData: any = await getWalletnData();
                updateUserData(newWalletData)
            }
        });
    
        window.ethereum.on('networkChanged', function (network: string) {
            if (network !== '1') {
               updateMainnetAlert(true)
               updateUserData(defaultUserValues)
            }
        });
      }

    return (
        <>
            <MainNetAlert />
            {userAdders ? <UserPage /> : <LandingPage />}
        </>
    )
}

export default Display
