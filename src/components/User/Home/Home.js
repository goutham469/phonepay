import React, { useEffect, useState } from 'react'
import store from '../../../store'
import { Outlet, useNavigate } from 'react-router-dom';

import './Home.css'

function Home() {
  const navigate = useNavigate();

  let [userEmail,setUserEmail] = useState('')
  let [balance,setBalance] = useState(0);

  useEffect(()=>{
    setUserEmail(store.getState().userEmail);
    if(store.getState() && store.getState().signed)
    {
      console.log("authorized")
    }
    else
    {
      navigate('/')
    }
    async function getData()
    {
      try
      {
        let data = await fetch('https://phonepay-mgu9.onrender.com/getUserData',{
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify({"email":store.getState().userEmail})
        })
        data = await data.json();
        console.log(data)
        
        setBalance(data.balance);
      }
      catch(err)
      {
        console.log(err)
      }
    }
    getData();

  },[])


  return (
    <div>
      <div>
        <h4>e-mail :- {userEmail?userEmail:"5001 not found , login to continue"}</h4>
        <p>Balance : {balance} /-</p>
        <br/>
        <div>
          <button className='PayAndRecharge' onClick={(event)=>{event.preventDefault();navigate('./')}}>Pay</button>
          <button className='PayAndRecharge' onClick={(event)=>{event.preventDefault();navigate('./recharge')}}>Recharge</button>
        </div>
      </div>
      <Outlet/>
    </div>
  )
}

export default Home