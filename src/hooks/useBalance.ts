import { useEffect, useContext } from 'react'
import { ZERO_ADDRESS, web3BNToFloatString } from '../wallet/utils'
import { getERC20Contract } from '../wallet'
import BigNumber from 'bignumber.js'
import BN from 'bn.js'
import { useWeb3React } from '@web3-react/core'
import { ITokens } from '../interfaces'
import { WalletContext } from "../context";


export default function useBalance(
    tokens: ITokens[]
) {
    const { updateUserData } = useContext(WalletContext)
    const { account, library, active } = useWeb3React()
   
  


    useEffect(() => {
        const getBalance = (tokenAddress: string, decimals: number, name?: string) => {

            // (async () => {
            //     const contract = await getERC20Contract(tokenAddress, library)
            //     console.log(contract);
                
            // })()
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
                                console.log(value, 'value');
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
        if (account) {
            (async () => {
                let tokenBalances: any = {};
                for (let token of tokens) {
                    const bn = await getBalance(token.address, token.decimals, token.name)
                    const pow = new BigNumber('10').pow(new BigNumber(token.decimals))
                    const tokenSymbol = token.symbol
                    const currentBalance = web3BNToFloatString(bn, pow, 16, BigNumber.ROUND_DOWN)

                    tokenBalances = { ...tokenBalances, [tokenSymbol]: currentBalance }
                }

                const networkID = await library?.eth.net.getId();
                updateUserData({
                    address: account,
                    network: networkID,
                    ethereumBalance: tokenBalances.ETH,
                    nexoBalance: tokenBalances.NEXO
                })
            })();

        }
    }, [active])
}