import React, { useState, createContext, FC } from "react"
import { IUser } from '../interfaces'


type Props = {
  children: React.ReactNode
}

const defaultValues:IUser = {
  address: null,
  network:null,
}

const WalletContext = createContext<any>(null);


export const WalletProvider: React.FC<Props> = ({ children }) => {

  const [userData,setUserData] = useState()

  const updateUserData = (data:any) => {
    setUserData(data)
  }

  return (
    <WalletContext.Provider value={{userData , updateUserData}}>
      {children}
    </WalletContext.Provider>
  )
}

export default WalletContext;