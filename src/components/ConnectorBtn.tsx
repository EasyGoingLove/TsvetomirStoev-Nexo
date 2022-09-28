import { useWeb3React } from "@web3-react/core";
import useBalance from "../hooks/useBalance";
import { injected } from "../wallet";
import Mainnet from '../wallet/assets/mainnet.json'

const ConnectorBtn = () => {

  const { activate } = useWeb3React()

  const connect = async () => {
    try {
      await activate(injected)
    } catch (err) {
      console.log(err);
    }
  }

  useBalance(Mainnet)

  return <button onClick={connect} className='connect-btn'>Connect with your Wallets</button>
};

export default ConnectorBtn;