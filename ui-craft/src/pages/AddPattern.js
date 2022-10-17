import React from 'react'
import { useNavigate } from 'react-router-dom'
import Nav from './../components/Nav'
import  {BiArrowBack } from "react-icons/bi"

export default function AddPattern() {

  const navigate = useNavigate();
  return (
    <>
    <Nav />

    <form class="add-template">
    <button onClick={() => navigate(-1)}><BiArrowBack /></button>
        <h2> Add A Pattern </h2>
        <label class="product"> Pattern Name: </label>
        <input type="text" class="product"/>
        <br></br>
        <label class="product"> Description: </label>
        <input type="text" class="product"/>
        <br></br>
        <label class="product"> Price: </label>
        <input type="number" class="product"/>
        <br></br>
        <label class="product"> Attach PDF: </label>
        <input type="checkbox" class="product"/>
        <br></br>
        <label class="product"> Upload Image: </label>
        <input type="checkbox" class="product"/>
        <br></br>
        <br></br>
        <button onClick={() => navigate('/workspace')}> Save Changes </button>
        <button onClick={() => navigate('/workspace')}> Publish Pattern </button>
    </form>
    
    </>
  )
}
