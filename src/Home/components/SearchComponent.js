import { useState } from 'react'
import Search from '../assets/Search.svg'
import { useGlobalContext } from '../../GlobalContext'

export default function SearchComponent() {
    let state = useGlobalContext()
    let TousSymtoms = state.TousSymtoms
    let [SelectedElements, setSelectedElements] = state.SelectedElements
    let [SearchResult, setSearchResult] = useState([])
    
    let search = e => {
        if(e) {
            let result = TousSymtoms.filter(s => s.toLowerCase().includes(e.toLowerCase()))
            setSearchResult([...result])
        }
        else {
            setSearchResult([])
        }
    }

    let IsElementSelected = (element) => SelectedElements.find(e => e === element)

    let selectElement = (element) => {
        setSearchResult([])
        let selected = IsElementSelected(element)
        if(selected) {
            let elements = SelectedElements.filter(e => e !== element)
            setSelectedElements([...elements])
        }
        else {
            setSelectedElements([...SelectedElements, element])
        }
    }

    return (
        <div className="search_component">
            <input onChange={e => search(e.target.value)} type="search" name="" id="" placeholder='Symptomes généraux et dermatologiques' />
            <div className="search_btn">
                <button>
                    <img src={Search} alt="" />
                </button>
            </div>

            {
                SearchResult.length > 0 ?
                <div className="symptones_container">
                        <ul>
                            {
                                SearchResult.map((s, i) => {
                                    return <li key={i} onClick={() => selectElement(s)}>{s}</li>
                                })
                            }
                        </ul>
                </div> :
                <></>
            }
        </div>
    )
}