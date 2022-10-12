import React from 'react'
import Nav from './../components/Nav'
import { BiSearch } from 'react-icons/bi';

export default function DBpage() {
  return (
    <>
      <Nav />

      <div class="searchbar">
        <input class="search" type="text"></input>
        <button> <BiSearch /> </button>
      </div>
      
    <table>
        <tr>
            <td> 
                <form>
                    <h2> Filters: </h2>
                    <h3> Craft </h3>
                    <label> crochet </label>
                    <input type="radio" />
                    <br></br>
                    <label> knitting </label>
                    <input type="radio" />
                    <br></br>
                    <label> cross-stitch </label>
                    <input type="radio" /> 

                    <br></br>

                    <h3> Price </h3>
                    <label> free </label>
                    <input type="checkbox" /> 
                    <br></br>
                    <label> $1 - 5 </label>
                    <input type="checkbox" /> 
                    <br></br>
                    <label> $ 5 - 10 </label> 
                    <input type="checkbox" />  
                    <br></br>
                    <label> &gt; $ 10 </label>
                    <input type="checkbox" />  
                </form>
            </td>
            <td> 
            <div class="pattern">      
                <h3 class="login">Pattern Results Will Go Here!</h3>
                    <table class="piece">
                        <tr class="deck">
                            <td class="name"> Pattern Name </td>
                            <td class="name"> Pattern Name </td>
                            <td class="name"> Pattern Name </td>
                        </tr>
                        <tr class="deck">
                            <td class="name"> Pattern Name </td>
                            <td class="name"> Pattern Name </td>
                            <td class="name"> Pattern Name </td>
                        </tr>
                        <tr class="deck">
                            <td class="name"> Pattern Name </td>
                            <td class="name"> Pattern Name </td>
                            <td class="name"> Pattern Name </td>
                        </tr>
                    </table>
            </div>
            </td>
        </tr>
    </table>
    
         
           
    
      

      

        
    </>
  )
}
