import { BrowserRouter } from 'react-router-dom'
import './global.scss'
import { Router } from './Router'

import { ContextProvider } from './Contexts/Context'

function App() {
  return (
    <BrowserRouter>
      <ContextProvider>
        <Router />
      </ContextProvider>
    </BrowserRouter>
  )
}

export default App
