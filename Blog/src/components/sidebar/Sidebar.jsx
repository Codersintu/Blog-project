import React, { useEffect, useState } from 'react'
import './sidebar.css'
import sideimg from '../../assets/lpuop.jpg'
import { Facebook, Instagram, Twitter } from "@mui/icons-material"
import axios from 'axios';
import { Link } from 'react-router-dom';
export function Sidebar(props) {
    const [cats,setCats]=useState([]);
    
    useEffect(()=>{
        const fetchcat=async()=>{
            const res=await axios.get("http://localhost:8101/api/category/")
            setCats(res.data)
        }
        fetchcat()
    },[])
    

    return (
        <div className="sidebar">
            <div className="sidebarItem">
                <span className="sidebarTitle">ABOUT ME</span>
                <img className='sidebarimg' src={sideimg} alt="" />
                <p className='sidebarpara'>Lorem Lorem ipsum dolor sit amet. ipsum dolor sit amet consectetur adipisicing elit. Quo, cum?</p>
            </div>
            <div className="sidebarItem">
                <span className="sidebarTitle">CATEGORIES</span>
                <div className="category">
                <ul className="categoryList">
                    {cats.map((c)=>(
                     <Link to={`/?cat=${c.name}`} className='link'>
                      <li className="categoryListItem" key={c._id}>{c.name}</li>
                      </Link>
                    ))}
                    
                    
                </ul>
             
                </div>

                <span className="sidebarTitle">FOLLOW US</span>

                <div className="Icon">
                    <Facebook/>
                    <Instagram/>
                    <Twitter/>
                </div>
                
            </div>
        </div>
    )
}
