import React, { useState } from 'react'

function InputContainer({ component, Values, setValues }) {
    const { name, icon, min, max, unit } = component
    const [IsContollerActive, setIsContollerActive] = useState(false)

    let handleChange = (e) => {
        setValues({...Values, [name]: e.target.value })
    }

    return (
        <div className="human_body_input_container">
            <div className="icon_container">
                <img src={icon} alt="" />
            </div>
            <span className="info" onClick={() => setIsContollerActive(!IsContollerActive)}>{Values[name] ? `${Values[name] + unit} ` : '---'}</span>

            <div className={`controller_container ${IsContollerActive ? 'active' : ''}`} >
                <div className="controller_header">
                    <p>{name}</p>
                    <span onClick={() => setIsContollerActive(false)}>✖</span>
                </div>

                <div className='controller_input_wrapper'>
                    {
                        name.toLowerCase() === 'sexe' ?
                        <select name={name} id="sexe" onChange={e => setValues({...Values, [name]: e.target.value})} value={Values[name]}>
                            <option value="Homme">Homme</option>
                            <option value="Femme">Femme</option>
                        </select> 
                        :
                        <input type="range" name={name} id="" onChange={handleChange} value={Values[name]} min={min} max={max} />
                    }
                </div>
            </div>
        </div>
    )
}

export default InputContainer