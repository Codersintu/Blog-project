import React, { useEffect, useState } from 'react'
import './Home.css'
import Header from '../../components/header/Header'
import { Sidebar } from '../../components/sidebar/Sidebar'
import Posts from '../../components/posts/posts'
import axios from 'axios'
import { useLocation } from 'react-router-dom'

function Home() {
  const [posts,setPosts]=useState([])
  const {search}=useLocation()
  console.log(location)
  useEffect(()=>{
    const fetchpost=async ()=>{
      const res=await axios.get(`http://localhost:8101/api/post/` + search)
      setPosts(res.data)
    }
    fetchpost();
},[search])
  return (
    <>
    <Header/>
    <div className="home">
      <Posts posts={posts}/>
      <Sidebar/>
    </div>
    </>
  )
}

export default Home