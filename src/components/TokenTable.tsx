import '../assets/styles/tokenTable.scss'



const TokenTable = () => {
    return (
        <div className="token-modal" >
            <div className="token-modal-content">
                <table id="customers">
                    <tbody>
                        <tr>
                            <th>Token Symbol</th>
                            <th>Contact</th>
                        </tr>
                        <tr>
                            <th>Decimals</th>
                            <th>Maria Anders</th>
                        </tr>
                        <tr>
                            <th>Total Supply</th>
                            <th>Maria Anders</th>
                        </tr>
                        <tr>
                            <th>Contract Address</th>
                            <th>Maria Anders</th>
                        </tr>
                    </tbody>
                </table>

            </div>
        </div>
    )
}



export default TokenTable