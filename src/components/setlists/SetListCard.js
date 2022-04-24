import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllTracks } from "../../modules/TracksManager";
import { getAllSetListTracks } from "../../modules/SetListTracksManager";
import { TrackCard } from "../track/TrackCard";
import "./SetListCard.css"

export const SetListCard = ({ setList, handleDeleteTrack, handleEditTrack, handleAddNotes }) => {
  const [tracks, setTracks] = useState([])
  const [setListTracks, setSetListTracks] = useState([])

  useEffect(() => {
    getAllTracks().then(setTracks)
  }, [])

  useEffect(() => {
    getAllSetListTracks().then(setSetListTracks)
  }, [])

  return (
    <div className="card">
      <div className="card-content">
        <h3 className="card-setListTitle">
            {setList.title}   
        </h3>
        <p>Notes: {setList.notes}</p>
        {/* {setListTracks.map(setListTrack => ( (setListTrack.trackId === track.id && setListTrack.id === setList.id) ? <TrackCard track={track} key={track.id} /> : '' ) ) } */}
        </div>
      </div>
  )
}