import { Route, Routes } from 'react-router-dom'
import './app.css'
import Home from './components/Home.jsx'
import PageNotFount from './components/PageNotFount.jsx'

import MainFile from './pages/MainFile.jsx'


function App() {
 

  return (
    <>
     {/* using react router dom for routing */}
    <Routes>
      <Route path='/' element={<MainFile />}/>
      <Route path='/Main' element={<MainFile />}/>
      {/* 404 error page code */}
      <Route path='*' element={<PageNotFount />}/>
    </Routes>
    
    </>
  )
}

export default App
