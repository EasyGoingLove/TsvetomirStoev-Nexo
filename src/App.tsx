import './App.css';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import {CoinbaseWalletSDK} from '@coinbase/wallet-sdk';

const providerOptions = {
    coinbasewallet:{
      package: CoinbaseWalletSDK,
      options:{
        appName : "Nexify"
      }
    },
}

function App() {

  async function connectWallet() {
    try {
      
      let web3Modal = new Web3Modal({
        cacheProvider: false,
        providerOptions,
        theme : {
          background:'red',
          main:'blue',
          secondary:'green',
          hover:'yellow',
          border:'white'
        }
      });
      const web3ModalInstance = await web3Modal.connect();
      const web3ModalProvider = new ethers.providers.Web3Provider(web3ModalInstance);
      console.log(web3ModalProvider);

    } catch (error) {
      console.log(error);

    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={connectWallet}>Open Sesamesz</button>
      </header>
    </div>
  );
}

export default App;
