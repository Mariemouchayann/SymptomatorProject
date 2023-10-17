import React from 'react'
import { useGlobalContext } from '../../GlobalContext'

function SelectedElements() {
    let state = useGlobalContext()
    let [SelectedElements] = state.SelectedElements
    let removeElement = state.removeElement

    return (
        <div className='selected_elements_container'>
            {
                SelectedElements.map((el, i) => {
                    return (
                        <div key={i} className='selected_element'>
                            <p>{el}</p>
                            <svg onClick={() => removeElement(el)} width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M1.26803 0.295003C1.65925 -0.0954047 2.29355 -0.0954047 2.68478 0.295003L7.98716 5.58632L13.2895 0.295004C13.6808 -0.0954041 14.3151 -0.0954041 14.7063 0.295004C15.0975 0.685411 15.0975 1.31839 14.7063 1.7088L9.40391 7.00011L14.7063 12.2914C15.0975 12.6818 15.0975 13.3148 14.7063 13.7052C14.3151 14.0956 13.6808 14.0956 13.2895 13.7052L7.98716 8.4139L2.68478 13.7052C2.29355 14.0956 1.65925 14.0956 1.26803 13.7052C0.876803 13.3148 0.876803 12.6818 1.26803 12.2914L6.57041 7.00011L1.26803 1.70879C0.876803 1.31839 0.876803 0.685411 1.26803 0.295003Z" fill="#f44336"></path>
                            </svg>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default SelectedElements