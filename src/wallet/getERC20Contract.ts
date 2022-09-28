import ABI from './assets/erc20.abi.json'

export const getERC20Contract =  (tokenAddress:string, web3:any) =>{
    return web3
    ?  new web3.eth.Contract(ABI,tokenAddress ,{
        from: web3.eth.defaultAccount,
    })
    : null
}

export const getERC20TestContract = (tokenAddress:string, web3:any) =>{

    return web3
    ? new web3.eth.Contract(ABI,tokenAddress ,{
        from: {
            rpcUrl:'http://127.0.0.1:7545',
            chainId: 1337
        },
    })
    : null
}