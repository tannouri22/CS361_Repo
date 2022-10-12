import React from 'react'
import Nav from './../components/Nav'
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
        <label class="product"> Date: </label>
        <input type="text" class="product"/>
        <br></br>
        <label class="product"> Cost </label>
        <input type="text" class="product"/>
    </form>
      
    </>
  )
}
