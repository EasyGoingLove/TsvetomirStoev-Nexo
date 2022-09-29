import React, { useState, createContext, FC } from "react"
import { IUser, IToken } from '../interfaces'


type Props = {
  children: React.ReactNode
}

export const defaultUserValues: IUser = {
  address: null,
  network: null,
  ethereumBalance: null,
  nexoBalance: null,
  signer: null,
  listOfTokens: []
}
export interface ITokenModal extends IToken {
  switchModal: boolean
}

export const defaultTokenModalValues: ITokenModal = {
  switchModal: false,
  tokenSymbol: null,
  decimals: null,
  totalSupply: null,
}

const WalletContext = createContext<any>(null);


export const WalletProvider: React.FC<Props> = ({ children }) => {

  const [userData, setUserData] = useState(defaultUserValues)

  const [tokenModal, setTokenModal] = useState(defaultTokenModalValues)

  const [mainnetAlert, setMainnetAlert] = useState(false)

  const [loader, setLoader] = useState(false)

  const updateUserData = (data: IUser) => {
    setUserData(data)
  }

  const updateTokenModal = (data: ITokenModal) => {
    setTokenModal(data)
  }

  const updateMainnetAlert = (setAlert: boolean) => {
    setMainnetAlert(setAlert)
  }

  const updateLoader = (isLoader: boolean) => {
    setLoader(isLoader)
  }

  return (
    <WalletContext.Provider value={{
      userData,
      updateUserData,
      tokenModal,
      updateTokenModal,
      mainnetAlert,
      updateMainnetAlert,
      loader,
      updateLoader
    }}>
      {children}
    </WalletContext.Provider>
  )
}

export default WalletContext;