import { Route, Router, Routes, useNavigate, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './App.css'
import SignIn from './page/SignIn'
import Home from './page/Home'
import LoadingScreen from './component/LoadingScreen'
import Welcome from './component/welcome'
import SignUp from './page/SignUp'
import Balance from './page/Balance'

function App() {

  const [showLoading, setShowLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() =>{
    if (!showLoading && window.location.pathname === '/') {
      navigate('/welcome');
    }
  },[showLoading, navigate])

  if(showLoading){
    return <LoadingScreen />
  }


  return (
    <div className="h-screen p-4 sm:p-6 md:p-8">
      <Routes>
          <Route path="/" element={<Navigate to="/welcome" replace />} />
          <Route path='/welcome' element={<Welcome />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/home' element={<Home />} />
          <Route path='/balance' element={<Balance />} />
      </Routes>
    </div>
  )
}

export default App
