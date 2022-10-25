import React from "react"
import Header from "./Header"
import ArbitrageCardContainer from "./ArbitrageCardContainer"

const MainPage = ({data}) => {
    return (
    <>
        <Header/>
        <ArbitrageCardContainer data={data}/>
    </>
    )
}

export default MainPage