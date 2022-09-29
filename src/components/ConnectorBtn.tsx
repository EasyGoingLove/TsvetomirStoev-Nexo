
import { WalletContext } from "../context";
import { useContext } from 'react'

import {connectWallet} from '../helpers/walletFunction'

const ConnectorBtn = () => {
  const { updateUserData ,userData , updateMainnetAlert} = useContext(WalletContext)

  const connect = async() => {
    const initialWalletData = await connectWallet()
    if(userData === initialWalletData){
      updateMainnetAlert(true)
    }
    updateUserData(initialWalletData) 
  }
 
  return <button onClick={connect} className='connect-btn'>Connect with your Wallets</button>
};

export default ConnectorBtn;