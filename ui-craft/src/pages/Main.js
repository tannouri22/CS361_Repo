import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Main() {

  const navigate = useNavigate();

  return (
    <>
       <form class="login">
            <h1 class= "logo"> Craftics </h1>
            <button class="loginbutton" onClick={() => navigate("/login") }>Login</button>
            <br></br>
            <button class="loginbutton" onClick={() => navigate("/signup") }>Sign Up</button>
       </form>
    </>
  )
}
