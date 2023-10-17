import { useGlobalContext } from '../../GlobalContext'
import Brain from '../assets/Brain.svg'
import Styled from 'styled-components';

export default function AlertBtnComponent() {
    let state = useGlobalContext()
    let handleSubmit = state.handleSubmit

    
const Div = Styled.div`
 font-family: inherit;
 color:white;

`
    return (
        <div className="absolute_btn" onClick={handleSubmit}>
            <img src={Brain} alt="" />
            <h2 style={{fontFamily:'inherit',color:'white',fontSize:'18px'}}>Analyser via l'assistant IA</h2>
        </div>
    )
}