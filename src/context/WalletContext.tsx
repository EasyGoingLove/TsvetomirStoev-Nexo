import React, { useState, createContext, FC } from "react"
import { IUser } from '../interfaces'


type Props = {
  children: React.ReactNode
}

export const defaultUserValues: IUser = {
  address: null,
  network: null,
  ethereumBalance: null,
  nexoBalance: null
}

const WalletContext = createContext<any>(null);


export const WalletProvider: React.FC<Props> = ({ children }) => {

  const [userData, setUserData] = useState(defaultUserValues)

  const updateUserData = (data: IUser) => {
    setUserData(data)
  }

  return (
    <WalletContext.Provider value={{ userData, updateUserData }}>
      {children}
    </WalletContext.Provider>
  )
}

export default WalletContext;