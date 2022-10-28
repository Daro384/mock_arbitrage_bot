import React from "react"

const BancorDetails = ({tokenID, tokenData, waitingData}) => {
    return (
        <div id={"bancorDetails"}>
            <h2>{`Bancor ${tokenID} Statistics`}</h2>
            <p>{`Liquidity: $${waitingData(Math.round(tokenData?.bancorData?.liquidity))}`}</p>
            <p>{`Price: $${waitingData(tokenData?.bancorData?.priceUSD)}`}</p>
            <p>{`Price 24H ago: $${waitingData(tokenData?.bancorData?.allData?.rate24hAgo?.usd)}`}</p>
            <p>{`Trade Volume 24H: $${waitingData(Math.round(tokenData?.bancorData?.allData?.volume24h?.usd))}`}</p>
        </div>
    )
}

export default BancorDetails