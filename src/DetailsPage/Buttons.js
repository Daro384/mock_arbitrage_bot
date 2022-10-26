import React from "react"
import { useNavigate } from "react-router-dom"


const Buttons = ({tokenID, data, index}) => {
    const navigate = useNavigate()
    return (
        <div>
            <button onClick={() => navigate("/")}>Back</button>
            <h1>{`${tokenID} Arbitrage Opportunity`}</h1>
            <div>
                <button 
                    onClick={() => navigate(`/Details/${data[index-1].name}`)}
                    disabled={!index}
                >Previous</button>
                <button 
                    onClick={() => navigate(`/Details/${data[index+1].name}`)} 
                    disabled={!(data.length-index-1)}
                >Next</button>
            </div>
        </div>
    )
}

export default Buttons