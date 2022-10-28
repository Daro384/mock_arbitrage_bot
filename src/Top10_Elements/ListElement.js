import React from "react"

const ListElement = ({data}) => {
    return (
        <div className="topCard">
            <h2>{`${data.id}: ${data.name}`}</h2>
            <p>{`Profit: $${data.profit}`}</p>
            <p>{`Time: ${data.dateTime}`}</p>
            <p>{`DexGuru price: $${data.guruPrice}`}</p>
            <p>{`Bancor price: $${data.bancorPrice}`}</p>
        </div>
    )
}

export default ListElement