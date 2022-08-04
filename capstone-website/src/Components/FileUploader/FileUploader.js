import './style.css';
import React, { useState } from 'react';
import axios from 'axios';
import { toast} from 'react-toastify';
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";




export const FileUploader = ({onSuccess}) => {

  if (document.readyState !== 'loading') {
    console.log('document is already ready, just execute code here');
    const form = document.querySelector('.contact-form');
    console.log("here",form);
    if (form != null){
      form.addEventListener('submit', handleFormSubmit);
    }
    else{
      console.log("else here")
      document.addEventListener('DOMContentLoaded', function () {
          console.log('document was not ready, place code here');
          const form = document.querySelector('.contact-form');
          console.log("here",form);
          form.addEventListener('submit', handleFormSubmit);
    });
    }
  } else {
      document.addEventListener('DOMContentLoaded', function () {
          console.log('document was not ready, place code here');
          const form = document.querySelector('.contact-form');
          console.log("here",form);
          form.addEventListener('submit', handleFormSubmit);
      });
  }


    const [files, setFiles] = useState([]);
    const [pred, setpred] = useState([]);
    let navigate = useNavigate();
    

      const onInputChange = (e) => {
          setFiles(e.target.files)
      };

      const onSubmit = (e) => {
          e.preventDefault();

          const data = new FormData();

          for(let i = 0; i < files.length; i++) {
              data.append('file', files[i]);
          }
          
          console.log("submitting!")

          axios.post('//localhost:8000/upload', data)
              .then((response) => {
                  toast.success('Upload Success');
                  onSuccess(response.data)
              })
              .catch((e) => {
                  toast.error('Upload Error')
              })
      };

      function handleFormSubmit(event) {
        event.preventDefault();
        
        const data = new FormData(document.getElementById("#"));

        const formJSON = Object.fromEntries(data.entries());
        formJSON.purpose = data.getAll('purpose');

        let formJSON_test = JSON.stringify(formJSON, null, 2);

        console.log(formJSON_test)

        axios.post(
          '//127.0.0.1:5000/predict', 
          formJSON_test,
          {
            headers: {"Access-Control-Allow-Origin": "*"},
           },
        ).then(({data})=>{
          console.log("data here",data)
          setpred(data)
          console.log("pred here",pred)
          navigate("/model", { state: data });
        } );
        
        
      }
      
      
    return (
      <>
      <section className="contact-form">
        <form method="post" action="#" id="#" onSubmit={onSubmit}>
              
                <div className="input-group">
                  <p className="group-label">Race:</p>
                  <input id="race-chinese" name="race" type="radio" value="Race_Chinese"/>
                  <label className="inline" htmlFor="race-chinese">Chinese</label>
                  
                  <input id="race-malay" name="race" type="radio" value="Race_Malay"/>
                  <label className="inline" htmlFor="race-malay">Malay</label>
                  
                  <input id="race-indian" name="race" type="radio" value="Race_Indian"/>
                  <label className="inline" htmlFor="race-indian">Indian</label>

                  <input id="race-eurasian" name="race" type="radio" value="Race_Eurasian"/>
                  <label className="inline" htmlFor="race-eurasian">Eurasian</label>

                  <input id="race-others" name="race" type="radio" value="Race_Others"/>
                  <label className="inline" htmlFor="race-others">Others</label>

                </div>
                
                
                <div className="input-group">
                  <label htmlFor="age">Age: </label>
                  <input id="age" name="age" type="number" required/>
                </div>

                <div className="input-group">
                  <label htmlFor="weight">Weight: </label>
                  <input id="weight" name="weight" type="number" required/>
                </div>

                <div className="input-group">
                  <label htmlFor="height">Height: </label>
                  <input id="height" name="height" type="number" required/>
                </div>
                
                <div className="input-group">
                  <label htmlFor="gender">What is your gender? </label>
                  <select id="gender" name="gender">
                    <option>Female</option>
                    <option>Male</option>
                  </select>
                </div>

                <div className="input-group">
                  <label htmlFor="wearhours">Wear Hours: </label>
                  <input id="wearhours" name="wearhours" type="number" required/>
                </div>

                <div className="input-group">
                  <label htmlFor="wearyears">Wear Years: </label>
                  <input id="wearyears" name="wearyears" type="number" required/>
                </div>

                <div className="input-group">
                  <label htmlFor="eyewearweight">Eyewear Weight: </label>
                  <input id="eyewearweight" name="eyewearweight" type="number" required/>
                </div>

                <div className="input-group">
                  <label htmlFor="nosearea">Nose Area: </label>
                  <input id="nosearea" name="nosearea" type="number" required/>
                </div>

                <div className="input-group">
                  <label htmlFor="currentcomfort">Current Comfort: </label>
                  <input id="currentcomfort" name="currentcomfort" type="number" required/>
                </div>

                <div className="input-group">
                  <label htmlFor="headwidth">Head Width: </label>
                  <input id="headwidth" name="headwidth" type="number" required/>
                </div>
                
                
                <div className="input-group">
                  <p className="group-label">I wear my eyewear to:</p>

                  <input id="purpose-correct" name="purpose" type="checkbox" value="PCorrect"/>
                  <label className="inline" htmlFor="purpose-correct">Correct my vision</label>
                  <input id="purpose-sports" name="purpose" type="checkbox" value="PSports"/>
                  <label className="inline" htmlFor="purpose-sports">Play sports</label>
                  <input id="purpose-cosmetic" name="purpose" type="checkbox" value="PCosmetic"/>
                  <label className="inline" htmlFor="purpose-cosmetic">For cosmetic reasons</label>
                  
                </div>
                
              <div className="form-group files" m={2}>
                <Button variant="outlined" className='form-pretty'>
                  <input type="file"
                        onChange={onInputChange}
                        name="objfile"
                        className="form-control"
                        />
                </Button>
              </div>
              <button type="submit">Send It!</button>
              
          </form>
          </section>
          </>
    )
};