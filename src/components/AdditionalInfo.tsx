import '../assets/styles/additionalinfo.scss'
import { WalletContext } from '../context'
import { useContext, useState } from 'react'
import { getTokenBalance, getTokenName, getTokenData } from '../helpers/walletFunction'
import { ITokenList } from '../interfaces'

const styles = {

    '& a:hover': {
        backgroundColor: 'red',
    }


};

const AdditionalInfo = () => {

    const { userData, updateUserData, updateTokenModal , updateLoader} = useContext(WalletContext)
    const [contractAddress, setContractAddress] = useState('');
    const [wrongAddress, setWrongAddress] = useState(false);
    const [hover, setHover] = useState<number | null>();

    const handleChange = (e: any) => {
        setContractAddress(e.target.value);
        if (wrongAddress) {
            setWrongAddress(false)
        }
    };

    const onHover = (id:number) => {
        setHover(id)
    }
    const onLeave = () => {
        setHover(null)
    }

    const getToken = async () => {
        const tokenBalance = await getTokenBalance(contractAddress, userData.signer, userData.address)
        const tokenName = await getTokenName(contractAddress, userData.signer)

        if (tokenBalance === -1) {
            setWrongAddress(true)
        } else {
            const newTokenObject = {
                name: tokenName,
                balance: tokenBalance,
                contractAddress: contractAddress
            }
            const updatedData = { ...userData, listOfTokens: [...userData.listOfTokens, newTokenObject] }
            updateUserData(updatedData)
        }
    }

    const showTokenData = async (tokenAddress: string) => {
        updateLoader(true)
        const [tokenSymbol, tokenDecimals, formatedTokenSupply]: any = await getTokenData(tokenAddress, userData.signer)
        updateLoader(false)
        updateTokenModal({
            tokenSymbol: tokenSymbol,
            decimals: tokenDecimals,
            totalSupply: formatedTokenSupply,
            switchModal: true
        })
    }

    return (
        <div className="adt-info-card">
            <h2 className="add-info-header">More Tokens & Information</h2>
            <hr />
            <h4 className="add-info-header">Input "Contract Address" of the token you want to add</h4>
            <input type="text" placeholder='Tokens Contract Address' className="address-input" onChange={handleChange} value={contractAddress} />
            {wrongAddress && <p style={{ color: 'red' }}>Wrong Address : Are you sure thats the correct address ?</p>}
            <div className='get-address-btn'><button onClick={getToken}>Get Token</button></div>
            <hr />
            <h4 className="add-info-header">Detected tokens in your wallet & tokens you added</h4>
            <table className='bonus-info-table'>
                <tbody>
                    <tr>
                        <th>Token Name</th>
                        <th>Balance</th>
                    </tr>
                    {userData.listOfTokens?.map((token: ITokenList, i: number) => {
                        return (
                            <tr
                                onMouseOver={()=>onHover(i)}
                                onMouseLeave={onLeave}
                                style={{ 
                                    transform: hover === i ? 'scale(1.1)' : 'none'
                                }}
                                key={`${token.name}}-${i}`}
                                onClick={() => { showTokenData(token.contractAddress) }}>
                                <th>{token.name}</th>
                                <th>{token.balance}</th>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}


export default AdditionalInfo