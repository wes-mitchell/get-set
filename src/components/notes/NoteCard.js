import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { getAllSongs, getSongById } from "../../modules/SongsManager";
import './NoteCard.css'


export const NoteCard = ({song}) => { 


  return (
    <div className="noteContainer">
      <div className="noteCard">
      <p>{song.notes}</p>
      </div>
    </div>
  )
 }