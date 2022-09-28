import { WalletContext } from '../context'
import { useContext } from 'react'
import LandingPage from './LandingPage'
import UserPage from './UserPage'

const Display = () => {
    window.ethereum.on('accountsChanged', function (acc:any) {
        // Time to reload your interface with accounts[0]!
        console.log('acc change',acc);
        
      });
    
      window.ethereum.on('networkChanged', function () {
        // Time to reload your interface with accounts[0]!
        console.log('net change');
        
      });
    const { userData } = useContext(WalletContext)
    const userAdders = userData?.address
    

    return (<>{userAdders ? <UserPage /> : <LandingPage />}</>)
}

export default Display
