import React from "react"

const ArbitrageCard = ({name, profit}) => {
    return (
    <div className="Arbitrage-Card">
        <h2>{`$${Math.round(profit)} arbitrage opportunity on ${name}`}</h2>
    </div>
    )
}

export default ArbitrageCard