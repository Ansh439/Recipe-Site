import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Header from './components/Header'
import Home from './pages/Home'
import About from './pages/About'
import PrivateDashboard from './components/PrivateDashboard'

export default function App() {
  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />
        <Route element={<PrivateDashboard />} >
          <Route path='/dashboard' element={<Dashboard />} />            
        </Route>
        <Route path='/about' element={<About />} />
      </Routes>
    </BrowserRouter>
  )
}
