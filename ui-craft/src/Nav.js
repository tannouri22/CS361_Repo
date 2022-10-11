import React from 'react';
import { BiWrench, BiData, BiLibrary, BiBrush, BiNetworkChart } from 'react-icons/bi';

export default function Nav() {
  return (
    <div>
        <table>
            <tr>
                <th>
                    <h1 class= "logo"> Craftics </h1>
                </th>
                <td>
                    <div class="page">
                        <BiBrush />
                        <a href=" ">  Workspace </a>
                    </div>
                </td>
                <td>
                    <div class="page">
                        <BiData /> 
                        <a href=" ">  Database </a>
                    </div>
                </td>
                <td>
                    <div class="page">
                        <BiLibrary />
                        <a href=" ">  Library </a>
                    </div>
                </td>
                <td>
                    <div class="page">
                        <BiNetworkChart />
                        <a href=" "> Statistics </a>
                    </div>
                </td>
                <td>
                    <div class="page">
                        <BiWrench />
                    </div>
                </td>
            </tr>
        </table>
    
       
      
      
       
    </div>
  )
}
