import React from "react"
import ListElement from "./ListElement"

const ListContainer = ({halfElements}) => {
    const listElements = halfElements.map(element => {
        return <ListElement key={element.name} data={element}/>
    })
    return (
        <div className="element">
            {listElements}
        </div>
    )
}

export default ListContainer