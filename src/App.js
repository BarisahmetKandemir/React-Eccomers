import React from 'react'
import { BrowserRouter , Routes,Route} from 'react-router-dom'
import Header from './components/header/Header'
import Home from './pages/home/Home'
import Contact from './pages/contact/Contact'
import Footer from './components/footer/Footer'
import Login from './pages/auth/Login'
import Reset from './pages/auth/Reset'
import Register from './pages/auth/Register'

const App = () => {
  return (
    <>
    <BrowserRouter>
      <Header/>
       <Routes>
         <Route path="/" element={<Home/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/reset" element={<Reset/>}/>
       </Routes> 
       <Footer/>
    </BrowserRouter>
    </>
  )
}

export default App