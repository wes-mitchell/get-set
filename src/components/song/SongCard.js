import React from "react";
import { useNavigate } from "react-router-dom";
import "./SongCard.css"

export const SongCard = ({ track, handleDeleteSetListTrack, setDialogVisible, handleNoteGesture }) => {
  const navigate = useNavigate()


  return (
    <>
      <div className="trackCard">
        { track.sequenceOrder === 0 ?
        <>
          <p className="trackName">{track.song?.name}</p>
          <p className="trackBPM">{track.song?.bpm} BPM</p>
        </>:
        <>
          <p className="trackName"><strong>{track.sequenceOrder}.</strong> {track.song?.name}</p>
          <p className="trackBPM">{track.song?.bpm} BPM</p>
          </>
        }
      </div>
      <div className="trackButtons">
        <button type="button" className="trackNotes" track={track} onClick={() => (handleNoteGesture(track),setDialogVisible(true))}>Notes</button>
        <button type="button" className="trackEdit" onClick={() => navigate(`/song/${track.song.id}/edit`)}>Edit</button>
        <button type="button" className="trackDelete" onClick={() => handleDeleteSetListTrack(track.id)}>Delete</button>
      </div>
    </>
  )
}