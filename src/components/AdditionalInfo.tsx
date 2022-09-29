import '../assets/styles/additionalinfo.scss'
import { WalletContext } from '../context'
import { useContext, useState } from 'react'
import { getTokenBalance , getTokenName } from '../helpers/walletFunction'
import { ITokenList } from '../interfaces'


const AdditionalInfo = () => {

    const { userData ,updateUserData} = useContext(WalletContext)
    const [contractAddress, setContractAddress] = useState('');
    const [wrongAddress, setWrongAddress] = useState(false);

    const handleChange = (e:any) => {
        setContractAddress(e.target.value); 
        if(wrongAddress){
            setWrongAddress(false)
        }  
    };
    
    const getToken = async() => {
        const tokenBalance  = await getTokenBalance(contractAddress,userData.signer,userData.address)
        const tokenName = await getTokenName(contractAddress,userData.signer)
        if(tokenBalance === -1){
            setWrongAddress(true)
        } else {
            const newTokenObject = {
                name: tokenName,
                balance:tokenBalance
            }
            const updatedData = {...userData , listOfTokens: [...userData.listOfTokens,newTokenObject]}    
            updateUserData(updatedData)
        }  
    }

    return (
        <div className="adt-info-card">
            <h2 className="add-info-header">More Tokens & Information</h2>
            <hr />
            <h4 className="add-info-header">INPUT "Contract Address" OF TOKEN YOU WANT TO SEE</h4>
            <input type="text" placeholder='Tokens Contract Address' className="address-input" onChange={handleChange} value={contractAddress}/>
            {wrongAddress && <p style={{color:'red'}}>Wrong Address : Are you sure thats the correct address ?</p>}
            <div className='get-address-btn'><button onClick={getToken}>Get Token</button></div>
            <hr />
            <h4 className="add-info-header">TOKENS WE FOUND IN YOUR WALLET</h4>
            <table className='bonus-info-table'>
                <tbody>
                    <tr>
                        <th>Token Name</th>
                        <th>Balance</th>
                    </tr>
                    {userData.listOfTokens?.map((token: ITokenList,i:number) => {
                        return (
                            <tr key={`${token.name}}-${i}`}>
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