import React, { useContext, useState } from 'react'
import './write.css'
import { Add } from '@mui/icons-material'
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
export function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(AuthContext);

  const handleSubmit = async (e) => {
      e.preventDefault();
      const newPost = {
          username: user.username,
          title,
          desc,
      };

      if (file) {
          const data = new FormData();
          const filename = Date.now() + file.name;
          data.append("name", filename);
          data.append("file", file);
          newPost.photo = filename;
          try {
              await axios.post("http://localhost:8101/api/upload", data);
          } catch (err) {
              console.error("Error uploading file:", err);
              return; // Stop if file upload fails
          }
      }

      try {
          const res = await axios.post("http://localhost:8101/api/post", newPost);
          console.log(res);
          window.location.replace("/post/" + res.data._id);
      } catch (err) {
          console.error("Error creating post:", err);
      }
  };

  return (
      <div className="write">
          {file && (
              <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
          )}
          <form className="writeform" onSubmit={handleSubmit}>
              <div className="writeformGroup">
                  <label htmlFor="fileInput">
                      <Add className='writeIcon' />
                  </label>
                  <input type="file" id='fileInput' style={{ display: "none" }} onChange={(e) => setFile(e.target.files[0])} />
                  <input
                      type="text"
                      placeholder='Title'
                      className='writeInput'
                      autoFocus={true}
                      onChange={e => setTitle(e.target.value)}
                  />
              </div>
              <div className="writeformGroup">
                  <textarea placeholder='Tell your Story...' className='writeInput writeText' onChange={e => setDesc(e.target.value)}></textarea>
              </div>
              <button className="writeSubmit" type='submit'>Publish</button>
          </form>
      </div>
  );
}