import { Route, Routes } from 'react-router-dom'
import './app.css'
import Home from './components/Home.jsx'
import PageNotFount from './components/PageNotFount.jsx'

import MainFile from './pages/MainFile.jsx'


function App() {
 

  return (
    <>
     
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/Main' element={<MainFile />}/>
      <Route path='*' element={<PageNotFount />}/>
    </Routes>
    
    </>
  )
}

export default App
