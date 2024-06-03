import React from 'react'
import './design1.css';
import CurrentTrack from './CurrentTrack';
import PlayerControls from './PlayerControls';
import VolumeControls from './VolumeControls';

export default function Footer() {
  return (
    <div className='Footer'>
     <CurrentTrack/>
     <PlayerControls/>
     <VolumeControls/>
    </div>
  )
}
