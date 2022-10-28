import React from "react"
import Header from "./Header"
import ArbitrageCardContainer from "./ArbitrageCardContainer"
import { useNavigate } from "react-router-dom"

const MainPage = ({data}) => {

    const navigate = useNavigate()
    
    return (
    <>
        <button id="top10Button" onClick={() => navigate("/Top10")}>Top 10</button>
        <Header/>
        <ArbitrageCardContainer data={data}/>
    </>
    )
}

export default MainPage