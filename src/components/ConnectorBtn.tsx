import { useWeb3React } from "@web3-react/core";
import useBalance from "../hooks/useBalance";
import { injected } from "../wallet";
import Mainnet from '../wallet/assets/mainnet.json'
import { WalletContext } from "../context";
import { useContext , useEffect } from "react";

const ConnectorBtn = () => {

  const { active, account, library, activate, deactivate } = useWeb3React()
  const { updateUserData } = useContext(WalletContext)

  const connect = async () => {
    try {
      await activate(injected)   
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {  
    (async () => {
      const  networkID = await library?.eth.net.getId();
      updateUserData({
        address: account,  
        network: networkID
      })
      
    })();
   
  },[account]);
  
  // const [balance] = useBalance(
  //   Mainnet[1].address,
  //   Mainnet[1].decimals
  // )

  
  // console.log('Token is ', Mainnet[1].name);

 
  return <button onClick={connect} className='connect-btn'>Connect with your Wallets</button>
};

export default ConnectorBtn;