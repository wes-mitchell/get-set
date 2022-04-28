import React from "react";
import { useNavigate } from "react-router-dom";
import "./SongCard.css"

export const SongCard = ({ track, handleDeleteSetListTrack }) => {
  const navigate = useNavigate()
  return (
    <>
      <div className="trackCard">
          <p className="trackName">{track.song?.name}</p>
          <p className="trackBPM">{track.song?.bpm} BPM</p>
      </div>
      <div className="trackButtons">
        <button type="button" className="trackNotes">Notes</button>
        <button type="button" className="trackEdit" onClick={() => navigate(`/song/${track.song.id}/edit`)}>Edit</button>
        <button type="button" className="trackDelete" onClick={() => handleDeleteSetListTrack(track.id)}>Delete</button>
      </div>
    </>
  )
}