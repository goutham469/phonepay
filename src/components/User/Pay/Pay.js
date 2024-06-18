import React, { useEffect, useState } from 'react'

import './Pay.css'
import { current } from '@reduxjs/toolkit';
import store from '../../../store';

function Pay() {
    let [users,setUsers] = useState([])
    let [currentState,setCurrentState] = useState(1);

    let [amount,setAmount] = useState(0)
    let [pin,setPin] = useState('')
    let [receiver,SetReceiver] = useState('')

 
    useEffect(()=>{
        async function GetUsers()
        {
            let data = await fetch('https://phonepay-mgu9.onrender.com/getAllUsers');
            data = await data.json();
            setUsers(data)
            console.log(users)

        }
        GetUsers();
    },[])
    function sendMoney1(email)
    {
        console.log(email);
        SetReceiver(email);
        setCurrentState(2)
    }
    async function sendMoney2(event)
    {
        event.preventDefault();
        let data = await fetch('https://phonepay-mgu9.onrender.com/transaction',{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({"sender":store.getState().userEmail,"receiver":receiver,"transactionAmount":Number(amount)})
        })
        data = await data.json()
        console.log(data)
        if(data.error_message == "insufficient_balance")
        {
            alert("insufficient balance");
        }
        else
        {
            alert(`${amount} transferred to ${receiver} successfully`)
        }

    }
  return (
    <div>
        <h4>Pay</h4>
        {
            currentState == 1 ?
            <div>
                <input type='text' placeholder='email id' className='receiverInputBox'/><br/>
                <center>
                    <div >
                        {
                            users.map(user=>{return <p className='userNameText' onClick={(event)=>{sendMoney1(user.email)}}>{user.email}</p>})
                        }
                    </div>
                </center>
            </div>
            :
            currentState == 2 ?
            <div>
                <p>enter amount</p>
                <input type='number' placeholder='amount in rupees' className='receiverInputBox' onChange={(event)=>setAmount(event.target.value)}/><br/>

                <p>enter your high-security password</p>
                <input type='password' placeholder='6 digit password' className='receiverInputBox' onChange={(event)=>setPin(event.target.value)}/><br/>


                <button onClick={(event)=>{sendMoney2(event)}}>Send Money</button>
            </div>
            :
            <div>
                <p>enter your high-security password</p>
                <input type='password' placeholder='6 digit password' className='receiverInputBox'/><br/>
                <button>Proceed</button>
            </div>
        }
    </div>
  )
}

export default Pay