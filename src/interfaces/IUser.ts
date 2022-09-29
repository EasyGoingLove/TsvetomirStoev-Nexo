import ITokenList from './ITokenList'

interface IUser {
    address: string | null
    
    network: number | null

    signer: any

    ethereumBalance: number |null

    nexoBalance: number | null
    
    listOfTokens?: ITokenList[] | []
}
export default IUser