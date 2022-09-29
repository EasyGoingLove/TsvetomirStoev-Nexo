interface IToken {
    tokenSymbol: string | null

    decimals: number | null

    totalSupply: number | null

    contractAddress: string | null
}

export default IToken