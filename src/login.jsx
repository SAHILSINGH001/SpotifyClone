import React from 'react'
import './design.css'

export default function login() {
  const handleClick=()=>{
    const clientId="cb5aac6ee79a4a8b9b77328c52e94ba6";
    const redirectUrl="http://localhost:3000/";
    const apiUrl="https://accounts.spotify.com/authorize";
    const scope=['user-read-email','user-read-private','user-modify-playback-state','user-read-playback-state','user-read-currently-playing',
  'user-read-recently-played','user-read-playback-position','user-top-read'];
  window.location.href=`${apiUrl}?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${scope.join(" ")}&response_type=token&show_dialog=true`;
  }
  
  return (
    <div className='login'>
      <img src='https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Black.png' alt='spotify'></img>
      <button onClick={handleClick}>Connect Spotify</button>
    </div>
  )
}
