import React from "react"
import { useNavigate } from "react-router-dom"

const ArbitrageCard = ({arbitrageData}) => {
    const navigate = useNavigate()
    return (
    <div className="Arbitrage-Card" onClick={() => navigate(`/Details/${arbitrageData.name}`)}>
        <h2>{`$${Math.round(arbitrageData.profit)} arbitrage opportunity on ${arbitrageData.name}`}</h2>
    </div>
    )
}

export default ArbitrageCard