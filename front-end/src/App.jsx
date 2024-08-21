
import { Routes , Route, Navigate } from 'react-router-dom'
import SignUp from './pages/SignUp'
import Home from './pages/Home'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import Header from './components/Header.jsx'
import UpdateTransaction from './pages/UpdateTransaction.jsx'
import { useQuery } from '@apollo/client'
import { GET_AUTH_USER } from './graphql/queries/user.query.js'
import { Toaster } from 'react-hot-toast'

function App() {

  const {data, loading, error} = useQuery(GET_AUTH_USER)
  console.log('authUser:' , data);

  if(loading) return <div className='h-screen w-full flex justify-center items-center'>
    <div className='w-6 h-6 border-t-2 border-b-2 mx-2 rounded-full animate-spin' ></div>
  </div>

  return (
    <>
			{data?.authUser && <Header />}
			<Routes>
				<Route path='/' element={data?.authUser ? <Home /> : <Navigate to='/login' />} />
				<Route path='/login' element={!data?.authUser ? <Login /> : <Navigate to='/' />} />
				<Route path='/signup' element={!data?.authUser ? <SignUp /> : <Navigate to='/' />} />
				<Route
					path='/transaction/:id'
					element={data?.authUser ? <UpdateTransaction /> : <Navigate to='/login' />}
				/>
				<Route path='*' element={<NotFound />} />
			</Routes>
			<Toaster />
		</>
  )
}

export default App
