import AlertBtnComponent from './components/AlertBtnComponent'
import HumanBodyComponent from './components/HumanBodyComponent'
import HumanInfoComponent from './components/HumanInfoComponent'
import Result from './components/Result'

function Home() {
    return (
        <div className='wrapper'>
            <HumanBodyComponent />
            <HumanInfoComponent />
            <AlertBtnComponent />
            <Result />
        </div>
    )
}


export default Home