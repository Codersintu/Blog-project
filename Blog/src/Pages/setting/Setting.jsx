import React, { useContext, useState } from 'react'
import './setting.css'
import { Sidebar } from '../../components/sidebar/Sidebar'
import { Person } from '@mui/icons-material'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'

export function Setting(props) {
    const {user,dispatch}=useContext(AuthContext)
    const [file, setFile] = useState(null);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState(false);
  
    const PF = "http://localhost:8101/images/"
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      dispatch({ type: "UPDATE_START" });
      const updatedUser = {
        userId: user._id,
        username,
        email,
        password,
      };
      if (file) {
        const data = new FormData();
        const filename = Date.now() + file.name;
        data.append("name", filename);
        data.append("file", file);
        updatedUser.profilePic = filename;
        try {
          await axios.post("/upload", data);
        } catch (err) {}
      }
      try {
        const res = await axios.put(`http://localhost:8101/api/user/${user._id}`, updatedUser);
        setSuccess(true);
        dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
      } catch (err) {
        dispatch({ type: "UPDATE_FAILURE" });
      }
    };
    

    return (
        
        <div className="setting">
            <div className="settingWrapper">
                <div className="settingTitle">
                <h1 className="settingTitleupdate">Update Your Account</h1>
                <span className="delete">Delete Account</span>
                </div>
                <form onSubmit={handleSubmit}>
                <div className="settingProfile">
                    <label className="profileTitle">Profile Picture</label>
                     <div className="profilecon">
                     <img className='settingImg' src={file ? URL.createObjectURL(file) : PF + user.profilePic} alt="" />
                   <label htmlFor="fileInput">
                   <Person className='personIcon'/>
                   </label>
                   <input type="file" onChange={(e) => setFile(e.target.files[0])} className='settingPPInput' id="fileInput" style={{display:"none"}} />
                  
                     </div>
                     </div>

                
                    <label className='label' htmlFor="username">Username</label>
                    <input type="text" id='username'    placeholder={user.username}
                      onChange={(e) => setUsername(e.target.value)} className='Input' />

                    <label className='label' htmlFor="email">Email</label>
                    <input type="text" id='email'  placeholder={user.email}
            onChange={(e) => setEmail(e.target.value)} className='Input' />

                    <label className='label' htmlFor="password">Username</label>
                    <input type="text" id='password' placeholder='password'  onChange={(e) => setPassword(e.target.value)} className='Input' />
                    <button className="updatebtn" type="submit">Update</button>

                    {success && (
                 <span
                    style={{ color: "green", textAlign: "center", marginTop: "20px" }}
                    >
                 Profile has been updated...
                   </span>
                  )}
                </form>
               
            </div>
            <Sidebar/>
        </div>
        
         
    )
}
