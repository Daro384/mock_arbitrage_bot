import React from "react"

const Summary = ({tokenID, tokenData, waitingData}) => {
    return (
        <div className={"detailSummary"}>
            <h2>Summary</h2>
            <h4>{`Difference USD: $${waitingData(tokenData?.difference)}`}</h4>
            <h4>{`Total tokens to buy and sell: ${waitingData(tokenData?.unitsBought)}`}</h4>
            <h4>{`Total cost: $${waitingData(tokenData?.cost)}`}</h4>
            <h4>{`Total revenue: $${waitingData(tokenData?.revenue)}`}</h4>
            <h4>{`Profit: $${waitingData(tokenData?.profit)}`}</h4>
        </div>
    )
}

export default Summary