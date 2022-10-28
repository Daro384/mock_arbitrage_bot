import React from "react"

const GuruDetails = ({tokenID, tokenData, waitingData}) => {
    return (
        <div id={"guruDetails"}>
            <h2>{`DEXGURU ${tokenID} Statistics`}</h2>
            <p>{`Liquidity: $${waitingData(Math.round(tokenData?.guruData?.liquidity))}`}</p>
            <p>{`Price: $${waitingData(tokenData?.guruData?.priceUSD)}`}</p>
            <p>{`Price 24H ago: $${waitingData(tokenData?.guruData?.priceUSD + tokenData?.guruData?.allData?.price_24h_delta_usd)}`}</p>
            <p>{`Trade Volume 24H: $${waitingData(Math.round(tokenData?.guruData?.allData?.volume_24h_usd))}`}</p>
        </div>
    )
}

export default GuruDetails