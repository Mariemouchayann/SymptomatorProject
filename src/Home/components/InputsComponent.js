import InputContainer from './InputContainer'
import { useGlobalContext } from '../../GlobalContext'
import { inputsData } from './inputsData'

export default function InputsComponent() {
    let state = useGlobalContext()
    let [Values, setValues] = state.Values

    return (
        <div className="human_info_inputs">
            {
                inputsData.map(comp => <InputContainer key={comp.name} component={comp} Values={Values} setValues={setValues} />)
            }
        </div>
    )
}