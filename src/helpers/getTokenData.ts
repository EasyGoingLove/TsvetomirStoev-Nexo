import { ethers } from "ethers";
import { CoinbaseWalletSDK } from "@coinbase/wallet-sdk";
import {defaultUserValues} from '../context/WalletContext'
import tokens from "../assets/wallet/tokens.json";
import erc20abi from '../assets/wallet/erc20.abi.json'

export const getTokenData = async () => {

  try {

    const web3ModalProvider = await new ethers.providers.Web3Provider(window.ethereum);
    const network = await web3ModalProvider.getNetwork();
    const signer = await web3ModalProvider.getSigner();
    const address = await signer.getAddress();
 
    if(network.chainId !== 1){
        return defaultUserValues
    }

    const nexoToken = await new ethers.Contract(tokens[0].address, erc20abi, signer);
    const nexoBalance = await nexoToken.functions.balanceOf(address);
    const formatedNexoBalance = ethers.utils.formatEther(nexoBalance[0])


   return {
    address: address,
    network: network.name === 'homestead' ? 'MAINNET': network.name.toUpperCase(),
    
    nexoBalance: formatedNexoBalance
  }
  } catch (error) {
    console.log(error);
  }
};





