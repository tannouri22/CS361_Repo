import React from 'react'
import Nav from './../components/Nav'

export default function Stats() {
  return (
    <>

    <Nav/>

    <table>
        <tr>
            <td> 
                <form>
                    <h2> Display Filters for Graph: </h2>
                    <h3> Factors </h3>
                    <label> cost </label>
                    <input type="radio" />
                    <br></br>
                    <label> completed projects </label>
                    <input type="radio" />
                    <br></br>
                    <label> net income </label>
                    <input type="radio" /> 
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
                </form>
            </td>
            <td> 
            <div class="pattern">      
                <h3 class="login">A Graph Will Go Here!</h3>
                  
            </div>
            </td>
        </tr>
    </table>
    </>
  )
}
