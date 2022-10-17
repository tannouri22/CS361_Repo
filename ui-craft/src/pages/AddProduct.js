import React from 'react'
import Nav from './../components/Nav'
import { BiSearch } from 'react-icons/bi';
import { useNavigate} from 'react-router-dom';

export default function AddProduct() {

  const navigate = useNavigate();

  return (
    <>
    <Nav />

    <form class="add-template">
        <h2> Add A Product </h2>
        <div class="searchbar">
            <input class="search" type="text"></input>
            <button id="searchicon"> <BiSearch /> </button>
        </div>
        <label class="product"> Date: </label>
        <input type="text" class="product"/>
        <br></br>
        <label class="product"> Cost </label>
        <input type="text" class="product"/>
        <br></br>
        <button onClick={() => navigate('/workspace')}> Save </button>
    </form>
      
    </>
  )
}
