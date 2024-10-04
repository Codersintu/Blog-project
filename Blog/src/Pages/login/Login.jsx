import React, { useContext, useRef } from 'react'
import './login.css'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios'

export function Login(props) {
    const userRef = useRef();
    const passwordRef = useRef();
    const { dispatch, isFetching } = useContext(AuthContext);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      dispatch({ type: "LOGIN_START" });
      try {
        const res = await axios.post("http://localhost:8101/api/auth/login", {
          username: userRef.current.value,
          password: passwordRef.current.value,
        });
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      } catch (err) {
        dispatch({ type: "LOGIN_FAILURE" });
      }
    };

    return (
       <div className="login">
        <form className="loginform" onSubmit={handleSubmit}>
            <h1 className="loginTitle">Login</h1>

            <label className='loginlabel' htmlFor="username">Email</label>
            <input ref={userRef} className='LoginInput' type="username" id='username' placeholder='username...' />

            <label className='loginlabel' htmlFor="password">Password</label>
            <input ref={passwordRef} className='LoginInput' type="password" id='password' />
           
             <button className='loginbtn' disabled={isFetching}>Login</button>
        </form>
        <button className='registers'>
            <Link className="link" to='/register'>
            REGISTER
          </Link>
          </button>
       </div>
    )
}
