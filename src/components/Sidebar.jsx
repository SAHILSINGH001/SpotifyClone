import React from 'react'
import './design1.css';
import PlayLists from './PlayLists';
import {IoLibrary} from 'react-icons/io5';
import {MdHomeFilled,MdSearch} from 'react-icons/md';

export default function Sidebar() {
  return (
    <div className='Sidebar'>
        <div className='top_links'>
            <div className='logo'>
                <img src='https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_White.png' alt='spotify'></img>
            </div>
            <ul className='unlist'>
                <li><MdHomeFilled/><span>Home</span></li>
                <li><MdSearch/><span>Search</span></li>
                <li><IoLibrary/><span>Your Library</span></li>
            </ul>
        </div>
        <PlayLists/>
    </div>
  )
}
