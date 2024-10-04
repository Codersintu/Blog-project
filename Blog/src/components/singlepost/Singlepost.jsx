import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './singlepost.css';
import { Delete, Edit } from '@mui/icons-material';
import axios from "axios"
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

export function Singlepost(props) {
    const PF="http://localhost:8101/images/"
    const location=useLocation();
    const path=location.pathname.split("/")[2];
    const [post,setPost]= useState({})
    const { user } = useContext(AuthContext);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [updateMode, setUpdateMode] = useState(false);

    useEffect(()=>{
        const getpost=async()=>{
            const res=await axios.get("http://localhost:8101/api/post/" + path)
            setPost(res.data)
            setTitle(res.data.title);
            setDesc(res.data.desc);
        }
        getpost()
    },[path])
    
    const handleDelete = async () => {
      try {
          await axios.delete(`http://localhost:8101/api/post/${post._id}`, {
              data: { username: user.username },
          });
          window.location.replace("/");
      } catch (error) {
          console.error("Delete error:", error.response ? error.response.data : error.message);
      }
  };
  

    const handleUpdate = async () => {
        try {
          await axios.put(`http://localhost:8101/api/post/${post._id}`, {
            username: user.username,
            title,
            desc,
          });
          setUpdateMode(false)
        } catch (err) {}
      };
    return (
        <div className="singlepost">
            <div className="postContainersingle">
                <div className="postsingle">
                  {post.photo && (
                      <img className='postImgsingle' src={PF + post.photo} alt="" />
                  )}
                    
                  
                   {updateMode ? (
                     <input
                       type="text"
                       value={title}
                       className="singlePostTitleInput"
                       autoFocus
                       onChange={(e) => setTitle(e.target.value)}
                     />
                   ) : (           
                 <h1 className='postTitlesingle'>{title}
                  {post.username === user?.username && (
                   <div className="Icon">
                     <Edit className='editIcon' onClick={() => setUpdateMode(true)}/>
                    <Delete className='delIcon' onClick={handleDelete}/>
                   </div>
                   )}
                 
                 </h1>
                )}
                 <Link to={`/?user=${post.username}`} className='link'>
                 <span className='Author'>Author: <b>{post.username}</b></span>
                 </Link>
                 
                 <span className='timer'>{new Date(post.createdAt).toDateString()}</span>
                 {updateMode ? (
                   <textarea
                     className="singlePostDescInput"
                     value={desc}
                     onChange={(e) => setDesc(e.target.value)}
                   />
                 ) : (
                 <p className='postpara1single'>{desc}</p>
                )}
                </div>
                {updateMode && (
               <button className="singlePostButton" onClick={handleUpdate}>
                Update
                </button>
                 )}

            </div>
        </div>
    )
}
