import React from 'react'
import Nav from './../components/Nav'
import  {BiArrowBack } from "react-icons/bi"
import { useNavigate } from 'react-router-dom'

export default function PatternPreview() {

  const navigate = useNavigate();

  return (
    <>
    <Nav />

    
    <form>
    
        <h2> Add A Pattern </h2>
        <button onClick={() => navigate(-1)}><BiArrowBack /></button>
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
        <input type="text" class="product"/>
        <br></br>
        <button class="product"> Open Pattern </button>
        <br></br>
    </form>
    
      
    </>
  )
}
