import React from 'react'
import {  GoogleLogin } from '@react-oauth/google';
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import '../Login/Login.css'

import store from '../../../store';

function SignUp() {
    const navigate = useNavigate();

    const onSuccess = async (response) => {
        // console.log('signUp Success:', response);
        const decodedToken = jwtDecode(response.credential);
        console.log('Decoded Token:', decodedToken);

        alert("account created")

        store.dispatch({type:"login",userEmail:decodedToken.email})

        let base_url = process.env.REACT_APP_SERVER_BASE_URL

        console.log(base_url)

        let data = await fetch(`https://phonepay-mgu9.onrender.com/createUser`,{
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify({"email":decodedToken.email,"pin":123456})
        })
        console.log(data)
        
        if(data.ok)
        {
          navigate('/user')
        }
        else
        {
          alert("account creation failed")
        }
        }
        // You can now send the decoded token to your server for further verification
    
    
      const onFailure = (response) => {
        console.log('Login Failed:', response);
      };
  return (
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-around"}}>
        <div style={{border:"1px solid black",borderRadius:"10px",margin:"30px",padding:"20px"}}>

            <button className='signUpbutton btn' onClick={()=>{navigate("/")}}>login</button>

            <h5>Payment App </h5>
            <h3>sign Up</h3>
            <p>create your account by clicking on below icon</p>
            <center>
                <GoogleLogin
                    buttonText="Login with Google"
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={true}
                />
            </center>
            <br/>
            <p>This application is password less system.</p>
            <p>secured by Google</p>
        </div>
    </div>
  )
}

export default SignUp;