import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { getAllSongs, getSongById } from "../../modules/SongsManager";


export const NoteCard = ({track}) => { 
  const [song, setSong] = useState([])


  useEffect(() => {
  getSongById(track.song.id)
  .then(song => setSong(song))
  }, [])

  return (
    <div className="noteContainer">
      <div className="noteCard">
      <p>{song.notes}</p>
      </div>
    </div>
  )
 }