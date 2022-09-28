import { WalletContext } from '../context'
import { useContext } from 'react'
import LandingPage from './LandingPage'
import UserPage from './UserPage'

const Display = () => {
    const { userData } = useContext(WalletContext)
    const userAdders = userData?.address

    return (<>{userAdders ? <UserPage /> : <LandingPage />}</>)
}

export default Display
