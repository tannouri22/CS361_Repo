import React from 'react'
import { useHistory } from 'react-router-dom';

export default function LoginPage() {

  const history = useHistory();

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
            <button onClick={() => history.push("/database") }>Start Crafting!</button>
       </form>
    </>
  )
}
