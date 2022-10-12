import React from 'react'
import Nav from './../components/Nav'

export default function UpdatePattern() {
  return (
    <>
      <form>
        <h2> Update A Pattern </h2>
    
        <label class="product"> Pattern Name: </label>
        <input type="text" class="product"/>
        <br></br>
        <label class="product"> Description: </label>
        <input type="text" class="product"/>
        <br></br>
        <label class="product"> Price: </label>
        <input type="text" class="product"/>
        <br></br>
        <label class="product"> Attach PDF: </label>
        <input type="checkbox" class="product"/>
        <br></br>
        <label class="product"> Upload Image: </label>
        <input type="checkbox" class="product"/>
    </form>
    </>
  )
}
