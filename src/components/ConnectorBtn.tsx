
import { WalletContext } from "../context";
import { useContext } from 'react'

import {connectWallet} from '../helpers/walletFunction'

const ConnectorBtn = () => {
  const { updateUserData , updateLoader} = useContext(WalletContext)

  const connect = async() => {
    const initialWalletData = await connectWallet()
    updateUserData(initialWalletData) 
  }
 
  return <button onClick={connect} className='connect-btn'>Connect with your Wallets</button>
};

export default ConnectorBtn;