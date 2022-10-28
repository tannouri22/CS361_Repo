import React from 'react'
import Nav from './../components/Nav'
import { BiSearch } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

export default function DBpage() {

  const navigate = useNavigate();
  return (
    <>
      <Nav />

    <div class="dbbox">
            <form>
              <div classname="filter-format">
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
              </div>
            </form>
           
      
            <div class="pattern">    
                <h1 class="title"> Database </h1>
                <div class="searchbar">
                    <input class="search" type="text"></input>
                    <button id="searchicon"> <BiSearch /> </button>
                </div>

                <div class="card">
                    <div class="name" onClick={() => navigate("/pattern-preview")}> Pattern Name </div>
                    <div class="name"> Pattern Name </div>
                    <div class="name"> Pattern Name </div>
                
                    <div class="name"> Pattern Name </div>
                    <div class="name"> Pattern Name </div>
                    <div class="name"> Pattern Name </div>
                
                    <div class="name"> Pattern Name </div>
                    <div class="name"> Pattern Name </div>
                </div>
            </div> 
    </div>  
    </>
  )
}
