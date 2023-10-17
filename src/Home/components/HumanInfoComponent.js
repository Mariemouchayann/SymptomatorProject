import InputsComponent from "./InputsComponent"
import SearchComponent from "./SearchComponent"
import SelectedElements from "./SelectedElements"

export default function HumanInfoComponent() {
    return (
        <div className="human_info_components">
            <InputsComponent />
            <SearchComponent />
            <SelectedElements />
        </div>
    )
}