import { ethers } from "ethers";
import { CoinbaseWalletSDK } from "@coinbase/wallet-sdk";
import {defaultUserValues} from '../context/WalletContext'
import tokens from "../assets/wallet/tokens.json";

export const getWalletData = async () => {

  try {

    const web3ModalProvider = await new ethers.providers.Web3Provider(window.ethereum);
    const network = await web3ModalProvider.getNetwork();
    const signer = await web3ModalProvider.getSigner();
    const address = await signer.getAddress();
    const ethBalance = ethers.utils.formatEther(await web3ModalProvider.getBalance(address))
    
    if(network.chainId !== 1){
        return defaultUserValues
    }

    const nexoToken = await new ethers.Contract(tokens[0].address, ['function balanceOf(address) external view returns (uint256)'], signer);
    const nexoBalance = await nexoToken.functions.balanceOf(address);
    const formatedNexoBalance = ethers.utils.formatEther(nexoBalance[0])


   return {
    address: address,
    network: network.name === 'homestead' ? 'MAINNET': network.name.toUpperCase(),
    ethereumBalance: ethBalance,
    nexoBalance: formatedNexoBalance
  }
  } catch (error) {
    console.log(error);
  }
};





