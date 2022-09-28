import { Display } from './pages';
import { Navbar } from './components';
import './assets/styles/global.scss';
import { WalletProvider } from './context';

const App = () =>{

  return (
      <WalletProvider>
        <Navbar />
        <Display />
      </WalletProvider>
  );
}

export default App;
