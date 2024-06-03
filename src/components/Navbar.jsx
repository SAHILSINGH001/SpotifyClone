import React from 'react'
import './design1.css';
import {FaSearch} from 'react-icons/fa';
import {CgProfile} from 'react-icons/cg'
import { useStateProvider } from '../utils/StateProvider';

export default function Navbar() {
 
    const [{userInfo}]=useStateProvider();
  return (
    <div className='Navbar'>
        <div className='search_bar'>
       
            <input type='text' placeholder='Artists ,Songs,or podcasts'></input>
            <FaSearch/>
        </div>
        <div className='avatar'>
            <a href="/">
                <CgProfile/>
                <span>
                    {userInfo?.userName}
                </span>
            </a>
        </div>
    </div>
  )
}
