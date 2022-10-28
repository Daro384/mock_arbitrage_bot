import React from "react"
import ArbitrageCard from "./ArbitrageCard"

const ArbitrageCardContainer = ({data}) => {
    const ArbitrageCards = data.map(opportunity => {
        return (<ArbitrageCard key={opportunity.name} arbitrageData={opportunity}/>)
    })
    return (
        <div className="cardHolder">
            {ArbitrageCards}
        </div>
    )
}

export default ArbitrageCardContainer