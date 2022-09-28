interface IUser {
    address: string | null
    
    network: number | null

    ethereumBalance: number |null

    nexoBalance: number | null
    
    listOfTokens?:any
}
export default IUser