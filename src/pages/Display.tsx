import { WalletContext ,defaultUserValues} from '../context'
import { useContext } from 'react'
import LandingPage from './LandingPage'
import UserPage from './UserPage'

const Display = () => {

    const { userData  , updateUserData} = useContext(WalletContext)
    const userAdders = userData?.address


    window.ethereum.on('accountsChanged', function (wallet:string[]) {
        if(!wallet.length) {
            updateUserData(defaultUserValues)   
        } 
      });
    
      window.ethereum.on('networkChanged', function (network:any) {
        console.log('net change',network);  
        if(network !== 1){
            alert('Please select MAINNET from your wallet netwwork')
        }
      });

    return (<>{userAdders ? <UserPage /> : <LandingPage />}</>)
}

export default Display
