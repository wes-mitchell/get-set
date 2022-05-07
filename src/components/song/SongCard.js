import React from "react";
import { useNavigate } from "react-router-dom";
import { getSetListTracksByCurrentSetList } from "../../modules/SetListTracksManager";
import "./SongCard.css"

export const SongCard = ({ track, handleDeleteSetListTrack, setDialogVisible, handleNoteGesture, currentSetList, setCurrentSetList }) => {
  const navigate = useNavigate()


  return (
    <>
      <div className="trackCard">
          <p className="trackName">{track.song?.name}</p>
          <p className="trackBPM">{track.song?.bpm} BPM</p>
      </div>
      <div className="trackButtons">
        <button type="button" className="trackNotes" track={track} onClick={() => (handleNoteGesture(track),setDialogVisible(true))}>Notes</button>
        <button type="button" className="trackEdit" onClick={() => navigate(`/song/${track.song.id}/edit`)}>Edit</button>
        <button type="button" className="trackDelete" onClick={() => handleDeleteSetListTrack(track.id)}>Delete</button>
      </div>
    </>
  )
}