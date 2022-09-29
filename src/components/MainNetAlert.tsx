import { useEffect, useState } from 'react';
import '../assets/styles/alertModal.scss'
import { WalletContext } from "../context";
import { useContext } from 'react'

const MainNetAlert = () => {
    const { mainnetAlert, updateMainnetAlert, userData } = useContext(WalletContext)

    if (mainnetAlert) {
        setTimeout(() => {
            updateMainnetAlert(false)
        }, 3000);
    }

    return <>
    {mainnetAlert && 
    <div className="alert-modal" >
        <div className="alert-modal-content">
         <h1>Warning!</h1>
         <h3>Please check if you are using the Mainnet network.</h3>
         <h3>Dapp may not work.</h3>
        </div>
    </div>
    }
    </>
}

export default MainNetAlert