import React from 'react'
import Nav from './Nav'
import { BiSearch } from 'react-icons/bi';

export default function AddProduct() {
  return (
    <>
    <Nav />

    <form>
        <h2> Add A Product </h2>
        <div class="searchbar">
            <input class="search" type="text"></input>
            <button> <BiSearch /> </button>
        </div>
        <label> Date: </label>
        <input type="text"/>
        <br></br>
        <label> Cost </label>
        <input type="text"/>
    </form>
      
    </>
  )
}
