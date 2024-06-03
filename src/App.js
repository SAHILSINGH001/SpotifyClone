import React,{useEffect} from 'react'
import Login from './login'
import { useStateProvider } from './utils/StateProvider';
import { reducerCases } from './utils/Constants';
//import Spotify from "./components/Spotify1";
import Spotify1 from './components/Spotify1';

export default function App() {
  const [{token},dispatch ]=useStateProvider()
  useEffect(()=>{
const hash=window.location.hash;
if(hash){
  const token=hash.substring(1).split("&")[0].split("=")[1];
  dispatch({type:reducerCases.SET_TOKEN,token});

}
  },[token,dispatch]);
  return (
    <div>
    {token ? <Spotify1/>:<Login/>}
    </div>
  )
}

