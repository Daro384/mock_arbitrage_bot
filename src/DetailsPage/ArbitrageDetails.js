import React from "react"
import { useParams } from "react-router-dom"
import Buttons from "./Buttons"
import GuruDetails from "./GuruDetails"
import BancorDetails from "./BancorDetails"
import Summary from "./Summary"

const ArbitrageDetails = ({data}) => {
    
    const params = useParams()
    const index = data.findIndex(token => token.name === params.tokenID)
    const tokenData = data[index]

    const waitingData = dataPoint => {
        if (data.length) return dataPoint
        else return "Awaiting Data"
    }
    
    return (
        <>
            <Buttons tokenID={params.tokenID} data={data} index={index}/>
            <div id="chain-text">
                <h2>Chain: Ethereum</h2>
            </div>
            <div id="buy-sell">
                <h2>{`Buy from: ${waitingData(tokenData?.buyDex)}`}</h2> 
                <h2>{`Sell to: ${waitingData(tokenData?.sellDex)}`}</h2>
            </div>
            <GuruDetails waitingData={waitingData} tokenID={params.tokenID} tokenData={tokenData}/>
            <BancorDetails waitingData={waitingData} tokenID={params.tokenID} tokenData={tokenData}/>
            <Summary waitingData={waitingData} tokenID={params.tokenID} tokenData={tokenData}/>
        </>
    )
}

export default ArbitrageDetails