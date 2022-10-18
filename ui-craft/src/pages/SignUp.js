import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function SignUp() {

  const navigate = useNavigate();

  return (
    <>
       <form class="login">
            <h1 class= "logo"> Craftics </h1>
            <h3> Username: </h3>
            <input type="text"></input>
            <h3> Password: </h3>
            <input type="text"></input>
            <br></br>
            <br></br>
            <button class="loginbutton" onClick={() => navigate("/login") }>Create Account</button>
       </form>
    </>
  )
}
