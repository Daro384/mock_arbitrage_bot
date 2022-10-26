import React from "react"
import { useParams } from "react-router-dom"
import Buttons from "./Buttons"
import GuruDetails from "./GuruDetails"
import BancorDetails from "./BancorDetails"
import Summary from "./Summary"

const ArbitrageDetails = ({data}) => {

    const sortedData = data.sort((a,b) => {
        return (b.profit - a.profit)
    })
    
    const params = useParams()
    const index = sortedData.findIndex(token => token.name === params.tokenID)
    const tokenData = sortedData[index]

    console.log(index)
    console.log(sortedData)
    console.log(tokenData)

    const waitingData = dataPoint => {
        if (sortedData.length) return dataPoint
        else return "Awaiting Data"
    }
    
    return (
        <>
            <Buttons tokenID={params.tokenID} data={sortedData} index={index}/>
            
            <div>
                <h2>Chain: Ethereum</h2>
            </div>
            <div>
                <h2>{`Buy Dex: ${waitingData(tokenData?.buyDex)}`}</h2> 
                <h2>{`Sell Dex: ${waitingData(tokenData?.sellDex)}`}</h2>
            </div>
            <GuruDetails waitingData={waitingData} tokenID={params.tokenID} tokenData={tokenData}/>
            <BancorDetails waitingData={waitingData} tokenID={params.tokenID} tokenData={tokenData}/>
            <Summary waitingData={waitingData} tokenID={params.tokenID} tokenData={tokenData}/>
        </>
    )
}

export default ArbitrageDetails