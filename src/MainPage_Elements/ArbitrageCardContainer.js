import React from "react"
import ArbitrageCard from "./ArbitrageCard"

const ArbitrageCardContainer = ({data}) => {
    const sortedData = data.sort((a,b) => {
        return (b.profit - a.profit)
    })
    const ArbitrageCards = sortedData.map(opportunity => {
        return (<ArbitrageCard key={opportunity.name} name={opportunity.name} profit={opportunity.profit}/>)
    })
    return (
        <span>
            {ArbitrageCards}
        </span>
    )
}

export default ArbitrageCardContainer