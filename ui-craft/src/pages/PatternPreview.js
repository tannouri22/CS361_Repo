import React from 'react'
import Nav from './../components/Nav'
import  {BiArrowBack } from "react-icons/bi"
import { useNavigate } from 'react-router-dom'

export default function PatternPreview() {

  const navigate = useNavigate();

  return (
    <>
    <Nav />

    
    <form class="add-template">
        <h2>
        <button onClick={() => navigate("/database")}><BiArrowBack /></button>
        &nbsp; &nbsp; Pattern Preview 
        </h2>
        
        <label class="product"> Image: </label>
        <br></br>
        <br></br>
        <label class="product"> Pattern Name: </label>
        <input type="text" class="product"/>
        <br></br>
        <label class="product"> Description: </label>
        <input type="text" class="product"/>
        <br></br>
        <label class="product"> Price: </label>
        <input type="number" class="product"/>
        <br></br>
        <button class="product"> Open Pattern </button>
        <br></br>
    </form>
    
      
    </>
  )
}
