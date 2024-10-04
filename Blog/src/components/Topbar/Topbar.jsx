import React, { useContext } from 'react'
import './topbar.css'
import {Facebook, Instagram, Search, Twitter} from "@mui/icons-material"
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'


export function Topbar() {
    const {user,dispatch}=useContext(AuthContext)
     const PF = "http://localhost:8101/images/"


    const handleLogout=()=>{
     dispatch({ type :"Logout"})
    }

    return (
        <div className="topbar">
            <div className="leftmenu">
              <Facebook className='Icon'/>
              <Twitter className='Icon'/>
              <Instagram className='Icon'/>
            </div>
            <div className="centermenu">
                <ul className="menulist">
                  <li className="menulistItem"> <Link className='link' style={{textDecoration:"none"}} to='/'>HOME</Link></li>
                    <li className="menulistItem">About</li>
                    <li className="menulistItem">Contact</li>
                    <li className="menulistItem"><Link to='/write' className='link'>Write</Link></li>
                    <li className="menulistItem" onClick={handleLogout}>{user && 'Logout'}</li>
                </ul>
            </div>
            <div className="rightmenu">
                {user ? (
                    <Link to='/setting' className='link'>
                <img className='profileImg' src={PF+user.profilePic} alt="profile" />
                </Link>
            ) : (
                <ul className='menulist'>
                    <li className="menulistItem">
                <Link className='link' style={{textDecoration:"none"}} to='/login'>LOGIN</Link>
                </li>
                <li className="menulistItem">
                <Link className='link' style={{textDecoration:"none"}} to='/register'>REGISTER</Link>
                </li>
                </ul>
            )}
            
                <Search className='searchIcon'/>
            </div>
            
        </div>
    )
}
