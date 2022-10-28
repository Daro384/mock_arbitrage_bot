import React from "react"

const Summary = ({tokenID, tokenData, waitingData}) => {
    return (
        <div id={"detailSummary"}>
            <h2>Summary</h2>
            <p>{`Difference USD: $${waitingData(tokenData?.difference)}`}</p>
            <p>{`Total tokens to buy and sell: ${waitingData(tokenData?.unitsBought)}`}</p>
            <p>{`Total cost: $${waitingData(tokenData?.cost)}`}</p>
            <p>{`Total revenue: $${waitingData(tokenData?.revenue)}`}</p>
            <p className="profit">{`Profit: $${waitingData(tokenData?.profit)}`}</p>
        </div>
    )
}

export default Summary