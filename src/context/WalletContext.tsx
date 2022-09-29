import React, { useState, createContext, FC } from "react"
import { IUser , IToken } from '../interfaces'


type Props = {
  children: React.ReactNode
}

export const defaultUserValues: IUser = {
  address: null,
  network: null,
  ethereumBalance: null,
  nexoBalance: null,
  signer: null,
}
export interface ITokenModal extends  IToken {
   switchModal:boolean
}

export const defaultTokenModalValues: ITokenModal = {
  switchModal:false,
  tokenSymbol: null,
  decimals: null,
  totalSupply: null,
}

const WalletContext = createContext<any>(null);


export const WalletProvider: React.FC<Props> = ({ children }) => {

  const [userData, setUserData] = useState(defaultUserValues)

  const [tokenModal, setTokenModal] = useState(defaultTokenModalValues)

  const updateUserData = (data: IUser) => {
    setUserData(data)
  }

  const updateTokenModal = (data: ITokenModal) => {
    setTokenModal(data)
  }
  
  return (
    <WalletContext.Provider value={{ userData, updateUserData ,tokenModal , updateTokenModal}}>
      {children}
    </WalletContext.Provider>
  )
}

export default WalletContext;