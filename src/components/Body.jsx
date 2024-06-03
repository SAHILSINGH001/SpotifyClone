import React,{useEffect} from 'react'
import './design1.css';
import {AiFillClockCircle} from 'react-icons/ai'
import { useStateProvider } from '../utils/StateProvider';
import axios from 'axios';
import { reducerCases } from '../utils/Constants';

export default function Body() {
    const [{token,selectedPlaylistId,selectedPlaylist},dispatch]=useStateProvider();
    useEffect(()=>{
     const getInitialPlaylists=async()=>{
        const response=await axios.get(`https://api.spotify.com/v1/playlists/${selectedPlaylistId}`,
        {
            headers:{
                Authorization:"Bearer "+token,
                "Content-Type":"application/json",
            },
        })
    const selectedPlaylist={
        id:response.data.id,
        name:response.data.name,
        description:response.data.description.startsWith("<a")?"":response.data.description,
        image:response.data.images[0].url,
        tracks:response.data.tracks.items.map(({track})=>({
         id:track.id,
         name:track.name,
         artists:track.artists.map((artists)=>artists.name),
         image:track.album.images[2].url,
         duration:track.duration_ms,
         album:track.album.name,
         context_uri:track.album.uri,
         track_number:track.track_number
        })),
    }
    dispatch({type:reducerCases.SET_PLAYLIST,selectedPlaylist})

     };
     getInitialPlaylists();
    },[token,dispatch,selectedPlaylistId])
    const msToMinutesAndSecond=(ms)=>{
        const minutes=Math.floor(ms / 60000);
        const seconds=((ms % 60000)/1000).toFixed(0);
        return minutes+":"+(seconds<10?"0":"")+seconds;
    };
    const playTrack=async(id,name,artists,image,context_uri,track_number)=>{
        const response=await axios.put(`https://api.spotify.com/v1/me/player/play`,
        {
            context_uri,
            offset:{
              position:track_number-1
            },
            position_ms:0,
        },
       {
        headers:{
            Authorization:"Bearer "+token,
            "Content-Type":"application/json",
        },
       }
       );
       if(response.status===204){
        const currentPlaying={
            id,name,artists,image,
        };
        dispatch({type:reducerCases.SET_PLAYING,currentPlaying});
        dispatch({type:reducerCases.SET_PLAYER_STATE,playerState:true});
       }
       else
       dispatch({type:reducerCases.SET_PLAYER_STATE,playerState:true});

    }
  return (
    <div className='body'>
        {
            selectedPlaylist && (
                <>
                    <div className='playlist'>
                        <div className='image'>
                            <img src={selectedPlaylist.image} alt='selectedplaylist'></img>
                        </div>
                        <div className='details'>
                            <span className='type'>PLAYLIST</span>
                            <h1 className='title'>{selectedPlaylist.name}</h1>
                            <p className='description'>{selectedPlaylist.description}</p>
                        </div>
                    </div>
                    <div className='list'>
                        <div className='header_row'>
                            <div className='col'>
                                <span>#</span>
                            </div>
                            <div className='col'>
                                <span>TITLE</span>
                            </div>
                            <div className='col'>
                                <span>ALBUM</span>
                            </div>
                            <div className='col'>
                                <span><AiFillClockCircle/></span>
                            </div>
                        </div>
                        <div className='tracks'>
                            {
                                selectedPlaylist.tracks.map(({id,name,artists,image,duration,album,context_uri,track_number,},index)=>{
                                    return(
                                        <div className='row' key={id} onClick={()=>playTrack(id,name,artists,image,context_uri,track_number)}>
                                        <div className='col'>
                                            <span>{index+1}</span>
                                        </div>
                                        <div className='col detail'>
                                        <div className='image'>
                                        <img src={image} alt='track'></img>
                                        </div>
                                        <div className='info'>
                                            <span className='name'>{name}</span>
                                            <span>{artists}</span>
                                        </div>
                                            
                                        </div>
                                        <div className='col album'>
                                            <span>{album}</span>
                                        </div>
                                        <div className='col'>
                                            <span>{  msToMinutesAndSecond(duration)}</span>
                                        </div>
                                        

                                        </div>
                                    )

                                })
                            }
                        </div>
                    </div>
                </>
            )
        }
    </div>
  )
}
