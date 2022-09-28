import { useState, useEffect } from 'react'
import { ZERO_ADDRESS, web3BNToFloatString } from '../wallet/utils'
import { getERC20Contract } from '../wallet'
import BigNumber from 'bignumber.js'
import BN from 'bn.js'
import { useWeb3React } from '@web3-react/core'

export default function useBalance(
  tokenAddress: string,
  decimals: any,
) {
  const [balance, setBalance] = useState('0')
  const { account, library } = useWeb3React()

  useEffect(() => {
    let isCancelled = false

    function getBalance() {
      return new Promise((resolve) => {
        if (!library || !tokenAddress) {
          resolve(new BN('0'))
          return
        }

        try {
          if (tokenAddress === ZERO_ADDRESS) {
            library.eth
              .getBalance(account)
              .then((value: string | number | number[] | BN | Uint8Array | Buffer) => {
                resolve(new BN(value))
              })
              .catch((error: any) => {
                console.log(error)
                resolve(new BN('0'))
              })
          } else {
            const contract = getERC20Contract(tokenAddress, library)
            contract?.methods
              .balanceOf(account)
              .call()
              .then((value: string | number | number[] | BN | Uint8Array | Buffer) => {
                console.log(value , 'value');
                
                resolve(new BN(value))
              })
              .catch((error: any) => {
                console.log(error)
                resolve(new BN('0'))
              })
          }
        } catch (error) {
            console.log(error);
            
            
          resolve(new BN('0'))
        }
      })
    }

  

    (async () => {
        const bn = await getBalance()
      if (!isCancelled) {
        const pow = new BigNumber('10').pow(new BigNumber(decimals))
        setBalance(web3BNToFloatString(bn, pow, 8, BigNumber.ROUND_DOWN))
      }
    })();

   

    return () => {
      isCancelled = true
    }
  }, [tokenAddress, library, decimals, account])

  return [balance]
}