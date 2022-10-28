import React from "react"
import Header from "./Header"
import ListContainer from "./ListContainer"
import { useNavigate } from "react-router-dom"

const Top10 = ({top10Data}) => {
    const navigate = useNavigate()
    return (
        <>
            <button id={"mainPage"} onClick={() => navigate("/")}>Main page</button>
            <Header /> 
            <div id="top10Container">
                <ListContainer halfElements={top10Data.slice(0,5)}/>
                <ListContainer halfElements={top10Data.slice(5)}/>
            </div>
        </>
    )
}

export default Top10