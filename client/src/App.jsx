import  React  from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './Home'
import Register from './Register'
import Login from './Login'
import SslTable from './SslTable'

function App() {
   

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<SslTable />}></Route>
      <Route path='/register' element={<Register />}></Route>
      <Route path='/login' element={<Login />}></Route>

    </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
