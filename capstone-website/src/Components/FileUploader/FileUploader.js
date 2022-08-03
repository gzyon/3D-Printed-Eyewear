import './style.css';
import React, { useState } from 'react';
import axios from 'axios';
import { toast} from 'react-toastify';
import { Typography, Button } from '@mui/material'

export const FileUploader = ({onSuccess}) => {
    const [files, setFiles] = useState([]);

      const onInputChange = (e) => {
          setFiles(e.target.files)
      };

      const onSubmit = (e) => {
          e.preventDefault();

          const data = new FormData();

          for(let i = 0; i < files.length; i++) {
              data.append('file', files[i]);
          }

          axios.post('//localhost:8000/upload', data)
              .then((response) => {
                  toast.success('Upload Success');
                  onSuccess(response.data)
              })
              .catch((e) => {
                  toast.error('Upload Error')
              })
      };
    return (
        <form method="post" action="#" id="#" onSubmit={onSubmit} >
           
              <div className="form-group files" m={2}>
                <Typography variant="h5" component="h1" color="#14140A">
                  <b>Upload your file here</b>
                </Typography>
                <input type="file"
                       onChange={onInputChange}
                       className="form-control"
                       multiple/>
              </div>
              
            <button>Submit</button>
          </form>
    )
};