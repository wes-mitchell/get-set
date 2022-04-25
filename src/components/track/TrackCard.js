import React from "react";
import "./TrackCard.css"

export const TrackCard = ({ track }) => {
  return (
    <>
      <div className="trackCard">
          <p className="trackName">{track.track.name}</p>
          <p className="trackBPM">{track.track.bpm} BPM</p>
      </div>
      <div className="trackButtons">
        <button type="button" className="trackNotes">Notes</button>
        <button type="button" className="trackEdit">Edit</button>
        <button type="button" className="trackDelete">Delete</button>
      </div>
    </>
  )
}