
import './App.css'
import { Topbar } from './components/Topbar/Topbar'
import Home from './Pages/Home/Home'
import { Single } from './Pages/single/Single'
import { Write } from './Pages/write/Write'
import { Setting } from './Pages/setting/Setting'
import { Login } from './Pages/login/Login'
import { Register } from './Pages/registersss/Register'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { Post } from './components/post/Post'
import { useContext } from 'react'
import { AuthContext } from './context/AuthContext'



function App() {
const {user}=useContext(AuthContext)

  return (
    
   
    <Router>
       <Topbar/>
    <Routes>
      <Route exact path="/" element={user ? <Home/> :<Register/>} />
      <Route path="/login" element={user ? <Navigate to="/"/> :<Login />} />
      <Route path="/register" element={user ? <Navigate to="/"/> :<Register />} />
      <Route path="/write" element={user ? <Write/> : <Navigate to="/register"/>} />
      <Route path="/setting" element={user ? <Setting /> :<Navigate to="/register"/>} />
      <Route path="/post/:postId" element={<Single />} />
    </Routes>
  </Router>
  
  )
}

export default App
