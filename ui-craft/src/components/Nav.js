import React from 'react';
import { BiWrench, BiData, BiLibrary, BiBrush, BiNetworkChart } from 'react-icons/bi';
import {Link, useHistory} from 'react-router-dom'

export default function Nav() {

    const history = useHistory();
  return (
    <div class="navbox">
       
        <div>
            <h1 class= "logo"> Craftics </h1>
        </div>

        <div class="page">
            <BiBrush />
            <Link to="/workspace">  Workspace </Link>
        </div>
    
        <div class="page">
            <BiData /> 
            <Link to="/database">  Database </Link>
        </div>
    
        <div class="page">
            <BiLibrary />
            <Link to="/library">  Library </Link>
        </div>
    
        <div class="page">
            <BiNetworkChart />
            <Link to="/stats"> Statistics </Link>
        </div>
    
        <div class="page">
            <button id="wrench" onClick={() => history.push("/")}> <BiWrench /> </button>
        </div>

    </div>
  )
}
