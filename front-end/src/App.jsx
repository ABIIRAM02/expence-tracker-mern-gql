
import { Routes , Route } from 'react-router-dom'
import SignUp from './pages/SignUp'
import Home from './pages/Home'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import Header from './components/Header.jsx'
import UpdateTransaction from './pages/UpdateTransaction.jsx'

function App() {

  const authUser = true

  return (
    <>
    {authUser && <Header />}
    <Routes>
      <Route path='/signup' element={<SignUp />} />
      <Route path='/login' element={<Login />} />
      <Route path='/' element={<Home />} />
      <Route path='/transaction' element={<UpdateTransaction />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
    </>
  )
}

export default App
