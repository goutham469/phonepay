import React from 'react'
import {  GoogleLogin } from '@react-oauth/google';
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import './Login.css'

import store from '../../../store';
import { type } from '@testing-library/user-event/dist/type';

function Login() {
    const navigate = useNavigate();

    const onSuccess = async (response) => {
        console.log('Login Success:', response);
        const decodedToken = jwtDecode(response.credential);
        console.log('Decoded Token:', decodedToken);

        let data = await fetch(`https://phonepay-mgu9.onrender.com/checkUser`,{
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify({"email":decodedToken.email})
        })

        data = await data.json();
        if(data.email)
        {
          store.dispatch({type:"login",userEmail:decodedToken.email})
          navigate('/user')
        }
        else
        {
          navigate('signup')
        }

        
        }
        // You can now send the decoded token to your server for further verification
    
    
      const onFailure = (response) => {
        console.log('Login Failed:', response);
      };
  return (
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-around"}}>
        <div style={{border:"1px solid black",borderRadius:"10px",margin:"30px",padding:"20px"}}>


            <button className='' onClick={()=>{navigate("/admin")}}>admin</button>

            <button className='signUpbutton btn' onClick={()=>{navigate("/signup")}}>sign up</button>

            <h5>Payment App </h5>
            <h3>Login</h3>
            <p>Login to your account by clicking on below icon</p>
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

export default Login;