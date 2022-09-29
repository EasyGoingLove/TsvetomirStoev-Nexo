import { BigNumber, ethers } from "ethers";
import Web3Modal from "web3modal";
import { CoinbaseWalletSDK } from "@coinbase/wallet-sdk";
import { defaultUserValues } from '../context/WalletContext'

import erc20abi from '../assets/wallet/erc20.abi.json'
import tokens from '../assets/wallet/tokens.json'
import tokensTodDetect from '../assets/wallet/tokensToDetect.json'

export const providerOptions = {
  coinbasewallet: {
    package: CoinbaseWalletSDK,
    options: {
      appName: "Nexify",
    },
  },
};

export const connect = async () => {
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

    return [web3ModalProvider]
  } catch (error) {
    console.log(error);
    return null
  }
}

export const getConnectionData = async () => {
  try {
    const [web3ModalProvider]: any = await connect()

    const network = await web3ModalProvider.getNetwork();
    const signer = await web3ModalProvider.getSigner();
    const address = await signer.getAddress();
    const ethBalance = ethers.utils.formatEther(await web3ModalProvider.getBalance(address))
    const nexoBalance = network.chainId === 1 ? await getTokenBalance(tokens[0].address, signer, address) : '0'

   
    const listOfTokenBalances = network.chainId === 1 ?  await Promise.all(tokensTodDetect.map((token) => { 
      const balance  = getTokenBalance(token.address, signer, address)
      return balance
    })) : []
    const listOfNonZeroTokens = listOfTokenBalances.length !== 0 ? listOfTokenBalances.reduce((arr:any,blc,i) => blc !== '0.0' ? [...arr,{name:tokensTodDetect[i].name,balance:blc}] : arr, []) : []
 
    return [network, signer, address, ethBalance , nexoBalance , listOfNonZeroTokens]
  } catch (error) {
    console.log(error);
    return null
  }
}

export const getWalletnData = async () => {
  try {
    const web3ModalProvider = await new ethers.providers.Web3Provider(window.ethereum);

    const network = await web3ModalProvider.getNetwork();
    const signer = await web3ModalProvider.getSigner();
    const address = await signer.getAddress();
    const ethBalance = ethers.utils.formatEther(await web3ModalProvider.getBalance(address))
    const nexoBalance= await getTokenBalance(tokens[0].address, signer, address)

    return {
      address: address,
      network: network.name === 'homestead' ? 'MAINNET' : network.name.toUpperCase(),
      ethereumBalance: ethBalance,
      nexoBalance: nexoBalance,
      signer: signer
    }

  } catch (error) {
    console.log(error);
    return null
  }
}


export const getTokenContract = async (tokenAddress: string, signer: ethers.Signer | ethers.providers.Provider | undefined) => {
  const tokenContract = await new ethers.Contract(tokenAddress, erc20abi, signer);
  return tokenContract
}

export const getTokenBalance = async (tokenAddress: string, signer: ethers.Signer | ethers.providers.Provider | undefined, walletAddress: string) => {
  try {
  const tokenContract = await getTokenContract(tokenAddress, signer);
  const tokenDecimals = await tokenContract.functions.decimals();
  const tokenBalance = await tokenContract.functions.balanceOf(walletAddress);
  const formatedTokenBalance = ethers.utils.formatUnits(tokenBalance[0], tokenDecimals[0])
  
  return formatedTokenBalance 
  } catch (error) {
    return -1
  }
  
}

export const getTokenName = async (tokenAddress: string, signer: ethers.Signer | ethers.providers.Provider | undefined) => {
  try {
  const tokenContract = await getTokenContract(tokenAddress, signer);
  const tokenName = await tokenContract.functions.name();
  return tokenName 
  } catch (error) {
    return -1
  }
  
}

export const getTokenData = async (tokenAddress: string, signer: ethers.Signer | ethers.providers.Provider | undefined) => {
  const tokenContract = await getTokenContract(tokenAddress, signer);
  const tokenSupply = await tokenContract.functions.totalSupply();
  const formatedTokenSupply = ethers.utils.formatEther(tokenSupply[0]).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  const tokenDecimals = await tokenContract.functions.decimals();
  const tokenSymbol = await tokenContract.functions.symbol();

  return [tokenSymbol[0] ,tokenDecimals[0] ,formatedTokenSupply ]
}

export const connectWallet = async () => {

  try {
    const [network, signer, address, ethBalance , nexoBalance , listOfNonZeroTokens]: any = await getConnectionData()

    if (network.chainId !== 1) {
      return defaultUserValues
    }

    return {
      address: address,
      network: network.name === 'homestead' ? 'MAINNET' : network.name.toUpperCase(),
      ethereumBalance: ethBalance,
      nexoBalance: nexoBalance,
      signer: signer,
      listOfTokens:listOfNonZeroTokens
    }
  } catch (error) {
    console.log(error);
  }
};





