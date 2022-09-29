import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { CoinbaseWalletSDK } from "@coinbase/wallet-sdk";
import {defaultUserValues} from '../context/WalletContext'
import tokens from "../assets/wallet/tokens.json";
import erc20abi from '../assets/wallet/erc20.abi.json'

export const providerOptions = {
  coinbasewallet: {
    package: CoinbaseWalletSDK,
    options: {
      appName: "Nexify",
    },
  },
};

export const connect = async() => {
  try {
    let web3Modal = new Web3Modal({
      cacheProvider: false,
      providerOptions,
      network: 'https://mainnet.infura.io/v3/e6b118a9c04349d38193dd339cdbb8fd'

    });
    const web3ModalInstance = await web3Modal.connect();
    const web3ModalProvider = await new ethers.providers.Web3Provider(
      web3ModalInstance
    );

    return [ web3ModalProvider ]
  } catch (error) {
    console.log(error);
    return null
  }
}

export const getConnectionData = async() => {
  try {
    const [web3ModalProvider ] : any= await connect()

    const network = await web3ModalProvider.getNetwork();
    const signer = await web3ModalProvider.getSigner();
    const address = await signer.getAddress();
    const ethBalance = ethers.utils.formatEther(await web3ModalProvider.getBalance(address))

    return [ network, signer, address ,ethBalance] 
  } catch (error) {
    console.log(error);
    return null
  }
}



export const getTokenContract = async(tokenAddress:string , signer: ethers.Signer | ethers.providers.Provider | undefined) => {
  const tokenContract = await new ethers.Contract(tokenAddress, erc20abi, signer);
  return tokenContract
}

export const tokenData = async(tokenAddress:string , signer: ethers.Signer | ethers.providers.Provider | undefined) => {
  const tokenContract= await getTokenContract(tokenAddress, signer);
  const tokenBalance = await tokenContract.functions.balanceOf(tokenAddress);
  const formatedTokenBalance = ethers.utils.formatEther(tokenBalance[0])
  
  const tokenSupply = await tokenContract.functions.totalSupply();
  const formatedTokenSupply = ethers.utils.formatEther(tokenSupply[0]).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  
  const tokenDecimals = await tokenContract.functions.decimals();

  const tokenSymbol = await tokenContract.functions.symbol();

  return [formatedTokenBalance , formatedTokenSupply , tokenDecimals[0] , tokenSymbol[0]]
}

export const connectWallet = async () => {

  try {
    const [network, signer, address ,ethBalance]  :any= await getConnectionData()

    if(network.chainId !== 1){
        return defaultUserValues
    }

    
    const [formatedTokenBalance , formatedTokenSupply , tokenDecimals] = await tokenData(tokens[0].address,signer)
    
    console.log(formatedTokenSupply , tokenDecimals);
    
    
   return {
    address: address,
    network: network.name === 'homestead' ? 'MAINNET': network.name.toUpperCase(),
    ethereumBalance: ethBalance,
    nexoBalance: formatedTokenBalance
  }
  } catch (error) {
    console.log(error);
  }
};





