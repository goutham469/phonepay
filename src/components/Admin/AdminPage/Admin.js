import React, { useEffect, useState } from 'react'

function Admin() {
    let [password,setPassword] = useState('')
    let [signed,setSigned] = useState(false)
    let [errorMessage,setErrorMessage] = useState('')
    let [balance,setBalance] = useState(0);

    let [counter,setCounter] = useState(0)

    let [users,setUsers] = useState([])
    
    useEffect(()=>{
        async function getData()
        {
          try
          {
            let data = await fetch('https://phonepay-mgu9.onrender.com/getAllUsers')
            data = await data.json();
            console.log(data)
            setUsers(data)
            
          }
          catch(err)
          {
            console.log(err)
          }
        }
        getData();
    },counter)

    async function updateInDB(email)
    {
        console.log(balance);
        let response = await fetch('https://phonepay-mgu9.onrender.com/recharge',{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({"email":email,"rechargeAmount":Number(balance)})
        })
        if(response.ok)
        {
            alert("success")
            setCounter(counter+1);
        }
        else
        {
            alert("transaction failed.")
        }
    }
  return (
    <div>
        Admin
        <div>
            {
                !signed ?
                <div>
                    <p>Enter credentials to continue</p>
                    <input type='password' placeholder='enter password to continue' onChange={(event)=>setPassword(event.target.value)}/>
                    <br/>
                    <button onClick={(event)=>{event.preventDefault();if(password=="root"){setSigned(true);setErrorMessage('')}else{setErrorMessage('*invalid password!*')}}}>Ok</button>
                    <p style={{color:"red"}}>{errorMessage}</p>
                </div>
                :
                <div>
                    panel
                    <div>
                        all users
                        {
                            users.map(user=>{
                                return <div style={{border:"1px solid black",width:"800px",margin:"5px",padding:"3px",borderRadius:"5px",display:"flex",justifyContent:"space-between",backgroundColor:"#bfbbbf",color:"black"}}>
                                    <div>{user.email}</div>
                                    <div>pin : {user.pin}</div>
                                    <div>balance = {user.balance}</div>
                                    <input style={{height:"20px",width:"100px"}} placeholder='balance' type='number' onChange={(event)=>{setBalance(event.target.value)}}/>
                                    <button onClick={(event)=>{event.preventDefault();updateInDB(user.email)}}>update</button>
                                </div>
                            })
                        }
                    </div>
                </div>
            }
        </div>
    </div>
  )
}

export default Admin