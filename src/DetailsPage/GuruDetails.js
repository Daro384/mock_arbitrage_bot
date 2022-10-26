import React from "react"

const GuruDetails = ({tokenID, tokenData, waitingData}) => {
    return (
        <div className={"dexDetails"}>
            <h2>{`DEXGURU ${tokenID} Statistics`}</h2>
            <h4>{`Liquidity: $${waitingData(Math.round(tokenData?.guruData?.liquidity))}`}</h4>
            <h4>{`Price: $${waitingData(tokenData?.guruData?.priceUSD)}`}</h4>
            <h4>{`Price 24H ago: $${waitingData(tokenData?.guruData?.priceUSD + tokenData?.guruData?.allData?.price_24h_delta_usd)}`}</h4>
            <h4>{`Trade Volume 24H: $${waitingData(Math.round(tokenData?.guruData?.allData?.volume_24h_usd))}`}</h4>
        </div>
    )
}

export default GuruDetails