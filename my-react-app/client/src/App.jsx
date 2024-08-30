import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Header from './components/Header'
import './App.css'
import { BrowserRouter as Router } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return(
    <Router>
      <div className='AppContainer'>
        <Header />
      </div>
    </Router>
  )
}

export default App
