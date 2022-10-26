import React from "react"

const BancorDetails = ({tokenID, tokenData, waitingData}) => {
    return (
        <div className={"dexDetails"}>
            <h2>{`Bancor ${tokenID} Statistics`}</h2>
            <h4>{`Liquidity: $${waitingData(Math.round(tokenData?.bancorData?.liquidity))}`}</h4>
            <h4>{`Price: $${waitingData(tokenData?.bancorData?.priceUSD)}`}</h4>
            <h4>{`Price 24H ago: $${waitingData(tokenData?.bancorData?.allData?.rate24hAgo?.usd)}`}</h4>
            <h4>{`Trade Volume 24H: $${waitingData(Math.round(tokenData?.bancorData?.allData?.volume24h?.usd))}`}</h4>
        </div>
    )
}

export default BancorDetails