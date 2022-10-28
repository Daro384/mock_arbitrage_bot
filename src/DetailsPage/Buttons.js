import React from "react"
import { useNavigate } from "react-router-dom"


const Buttons = ({tokenID, data, index}) => {
    const navigate = useNavigate()
    return (
        <div>
            <div className="theTop">
                <button 
                    id="back"
                    onClick={() => navigate("/")}
                >Back</button>
            </div>
            <div className="theTop" id="DetailsHeaderDiv">
                <h1 >{`${tokenID} Arbitrage Opportunity`}</h1>
            </div>
            <div className="theTop">
                <button 
                    id="next"
                    onClick={() => navigate(`/Details/${data[index+1].name}`)} 
                    disabled={!(data.length-index-1)}
                >Next</button>
                <button 
                    id="previous"
                    onClick={() => navigate(`/Details/${data[index-1].name}`)}
                    disabled={!index}
                >Previous</button>
            </div>
        </div>
    )
}

export default Buttons