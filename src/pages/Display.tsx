import { WalletContext, defaultUserValues } from '../context'
import { useContext } from 'react'
import LandingPage from './LandingPage'
import UserPage from './UserPage'
import { MainNetAlert ,Loader} from '../components'

import { getWalletnData } from '../helpers/walletFunction'

const Display = () => {

    const { userData, updateUserData, updateMainnetAlert ,loader, updateLoader} = useContext(WalletContext)
    const userAdders = userData?.address

    if (typeof window.ethereum !== 'undefined') {
        window.ethereum.on('accountsChanged', async function (wallet: string[]) {
            if (!wallet.length) {
                updateUserData(defaultUserValues)
            } else {
                updateLoader(true)
                const newWalletData: any = await getWalletnData();
                updateLoader(false)
                updateUserData(newWalletData)
            }
        });
    
        window.ethereum.on('networkChanged', function (network: string) {          
            if (network !== '1') {  
               updateMainnetAlert(true)
            }
        });
      }

    return (
        <>   
            {loader && <Loader/>}
            <MainNetAlert />
            {userAdders ? <UserPage /> : <LandingPage />}
            
        </>
    )
}

export default Display
