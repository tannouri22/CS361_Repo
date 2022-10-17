import React from 'react'
import Nav from './../components/Nav'
import {BsGraphUp} from 'react-icons/bs'

export default function Stats() {
  return (
    <>

    <Nav/>
    <div class="dbbox"> 
        <div class="dbbox">
            <form class="filter-format">
                <h2> Filters for Graph: </h2>
                <h3> Factors </h3>
                <label> cost </label>
                <input type="radio" />
                <br></br>
                <label> completed projects </label>
                <input type="radio" />
                <br></br>
                <label> net income </label>
                <input type="radio" /> 
                <br></br>
                <label> revenue </label>
                <input type="radio" />

                <br></br>

                <h3> Timeframe </h3>
                <label> past month </label>
                <input type="checkbox" /> 
                <br></br>
                <label> past 6 months </label>
                <input type="checkbox" /> 
                <br></br>
                <label> past year </label> 
                <input type="checkbox" />  
                <br></br>
                <button> Reset</button>
            </form>
        </div>
        <div class="workitem2 graphical">
        <h2 class="title"> Statistics </h2>
            <h2> A graph will go here</h2>
            <div class="graph"><BsGraphUp/></div>
        </div>
    </div>
        
                  
          
    </>
  )
}
