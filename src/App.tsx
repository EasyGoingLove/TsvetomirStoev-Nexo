import { Display } from './pages';
import { Navbar } from './components';
import './assets/styles/global.scss';
import { WalletProvider } from './context';
import { Web3ReactProvider } from '@web3-react/core';
import Web3 from 'web3'


const getLibrary = (provider: any) => {
  return new Web3(provider)
}

const  App = () =>{

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <WalletProvider>
        <Navbar />
        <Display />
      </WalletProvider>
    </Web3ReactProvider>
  );
}

export default App;
