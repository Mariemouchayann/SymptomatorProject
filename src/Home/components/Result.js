import React from 'react'
import { useGlobalContext } from '../../GlobalContext'

function Result() {
    let state = useGlobalContext()
    let [ShowResultPopup, setShowResultPopup] = state.ShowResultPopup
    let [ShowData] = state.ShowData

    return (
        <div className={`result_popup_container ${ShowResultPopup ? 'show' : 'hide'}`}>
            <div className="result_popup_content">
                <p>{ShowData?.explanation}</p>
                
                <br/>
                <ul>
                    {
                        ShowData?.diagnoses.map((d, i) => {
                            return <li key={i}>{d}</li>
                        })
                    }
                </ul>

                <br/>
                <span>
                    <button className='close' onClick={() => setShowResultPopup(!ShowResultPopup)}>Fermer</button>
                    <button className='next'>Suivant</button>
                </span>
            </div>
        </div>
    )
}

export default Result