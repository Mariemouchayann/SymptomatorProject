import React from 'react'

function HumanPopUp({ props }) {
    return (
        <div className={`human_body_popup ${props.HidePopUp ? 'hide' : 'show'}`} style={{ top: props.PopUpCoordinates.y+'px', left: props.PopUpCoordinates.x+'px'}}>
            <div className="head">
                <p>{props.PartElements.name}</p>
                <span onClick={() => props.setHidePopUp(true)}>×</span>
            </div>

            <div className="search_container">
                <input onChange={e => props.search(e.target.value)} type="search" name="" id="" placeholder='Recherche...' />
            </div>

            <ul>
                {
                    props.Elements.map((element, i) => {
                        return <li key={i} onClick={() => props.selectElement(element)} className={`popup_list_element ${props.IsElementSelected(element) ? 'selected' : ''}`} >{element}</li>
                    })
                }
            </ul>
        </div>
    )
}

export default HumanPopUp