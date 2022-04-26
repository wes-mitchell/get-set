import React from "react";
import "./SongCard.css"

export const SongCard = ({ track }) => {
  return (
    <>
      <div className="trackCard">
          <p className="trackName">{track.song?.name}</p>
          <p className="trackBPM">{track.song?.bpm} BPM</p>
      </div>
      <div className="trackButtons">
        <button type="button" className="trackNotes">Notes</button>
        <button type="button" className="trackEdit">Edit</button>
        <button type="button" className="trackDelete">Delete</button>
      </div>
    </>
  )
}