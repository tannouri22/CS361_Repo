import React from 'react'
import Nav from "./../components/Nav"
import {useHistory} from 'react-router-dom'

export default function Workspace() {

const history = useHistory();

  return (
    <>
      <Nav />

      <div class="workspacebox">


        <div class="workitem1">
          <button class="new" onClick= {() => history.push('/add-pattern')}> + Create A New Pattern</button>
          <br></br>
          <br></br>
          <button class="new" onClick = {() => history.push('/add-product')}> + Add A Product</button>
        </div>


        <div class="workitem2">

          <h2> Continue Working On: </h2>

          <div class="scrollbox">
            <div class="wip"> Project 1 </div>
            <div class="wip"> Project 2 </div>
            <div class="wip"> Project 3 </div>
          </div>

        </div>


      </div>
    </>
      
  )
}
