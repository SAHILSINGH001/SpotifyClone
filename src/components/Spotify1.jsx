import React,{useEffect} from 'react'
import './design1.css';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Body from './Body';
import Footer from './Footer';
import { useStateProvider } from '../utils/StateProvider';
import axios from 'axios';
import { reducerCases } from '../utils/Constants';

export default function Spotify1() {
  const [{token},dispatch]=useStateProvider();
  useEffect(()=>{
   const getUserInfo=async()=>{
    const {data}=await axios.get("https://api.spotify.com/v1/me",{
      headers:{
        Authorization:"Bearer "+token,
        "Content-Type":"application/json",
    },
    });

  
  const userInfo={
    userId: data.id,
    userName:data.display_name,
  };
  dispatch({type:reducerCases.SET_USER,userInfo})
};
getUserInfo();
  },[dispatch,token]);

  return (
    <div className='spotify1'>
      <div className='spotify_body'>
      <Sidebar/>
        <div className='body'>
        <Navbar/>
          <div className='body_contents'>
        <Body/>
          </div>
        </div>
      </div>
      <div className='spotify_footer'>
      <Footer/>
      </div>
    </div>
  )
}
