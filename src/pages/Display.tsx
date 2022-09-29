import { WalletContext, defaultUserValues } from '../context'
import { useContext } from 'react'
import LandingPage from './LandingPage'
import UserPage from './UserPage'

import {getWalletnData} from '../helpers/walletFunction'

const Display = () => {

    const { userData, updateUserData } = useContext(WalletContext)
    const userAdders = userData?.address


    window.ethereum.on('accountsChanged', async function (wallet: string[]) {
        if (!wallet.length) {
            updateUserData(defaultUserValues)
        } else {
            const newWalletData :any = await getWalletnData();
            
            updateUserData(newWalletData)
        }
    });

    window.ethereum.on('networkChanged', function (network: any) {
        console.log('net change', network);
        if (network !== 1) {
            alert('Please select MAINNET from your wallet netwwork')
        }
    });

    return (<>{userAdders ? <UserPage /> : <LandingPage />}</>)
}

export default Display
