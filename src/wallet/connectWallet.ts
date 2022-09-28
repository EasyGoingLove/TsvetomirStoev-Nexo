import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { CoinbaseWalletSDK } from "@coinbase/wallet-sdk";

import tokens from "../assets/wallet/tokens.json";

const providerOptions = {
  coinbasewallet: {
    package: CoinbaseWalletSDK,
    options: {
      appName: "Nexify",
    },
  },
};

export const connectWallet = async () => {

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

    const network = await web3ModalProvider.getNetwork();
    const signer = await web3ModalProvider.getSigner();
    const address = await signer.getAddress();
    const ethBalance = ethers.utils.formatEther(await web3ModalProvider.getBalance(address))

    console.log(address);
    console.log('Network', network);
    console.log('Ethereum', ethBalance);

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





