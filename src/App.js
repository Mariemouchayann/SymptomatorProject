import { ContextProvider } from './GlobalContext'
import Routers from './Routers'

function App() {
  return (
    <ContextProvider>
      <Routers />
    </ContextProvider>
  )
}

export default App