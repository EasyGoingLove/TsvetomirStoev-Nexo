import '../assets/styles/additionalinfo.scss'
import { WalletContext } from '../context'
import { useContext, useState } from 'react'
import { getTokenBalance } from '../helpers/walletFunction'
import tokens from '../assets/wallet/tokens.json'
import { ITokenList } from '../interfaces'


const AdditionalInfo = () => {

    const { userData ,updateUserData} = useContext(WalletContext)
    const [message, setMessage] = useState('');

    const handleChange = (e:any) => {
        setMessage(e.target.value);   
    };
    
    const getToken = async() => {
        const test  = await getTokenBalance(message,userData.signer,userData.address)
        const tt = {
            name:'bl',
            balance:test
        }
        console.log(test);
        const updatedData = {...userData , listOfTokens: [...userData.listOfTokens,tt]}
        console.log(updatedData);
        
        updateUserData(updatedData)
    }

    return (
        <div className="adt-info-card">
            <h2 className="add-info-header">More Tokens & Information</h2>
            <hr />
            <h4 className="add-info-header">INPUT "Contract Address" OF TOKEN YOU WANT TO SEE</h4>
            <input type="text" placeholder='Tokens Contract Address' className="address-input" onChange={handleChange} value={message}/>
            <div className='get-address-btn'><button onClick={getToken}>Get Token</button></div>
            <hr />
            <h4 className="add-info-header">TOKENS WE FOUND IN YOUR WALLET</h4>
            <table className='bonus-info-table'>
                <tbody>
                    <tr>
                        <th>Token Name</th>
                        <th>Balance</th>
                    </tr>
                    {userData?.listOfTokens.map((token: ITokenList,i:number) => {
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