import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllSetListTracks } from "../../modules/SetListTracksManager";
import { SongCard } from "../song/SongCard";
import "./SetListCard.css"

export const SetListCard = ({ setList, handleDeleteSong, handleEditSong, handleAddNotes }) => {
  const [setListTracks, setSetListTracks] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // Takes a set array as a parameter and returns all tracks related to current setlist by id

  const thisSetList = (setArr) => {return setArr.filter(setListTrack => (setListTrack.setListId === setList.id))}
  
  useEffect(() => {
    getAllSetListTracks()
    .then(res => thisSetList(res))
    .then(res => setSetListTracks(res))
  }, [])
  
  return (
    <div className="card">
      <div className="card-content">
        <h3 className="card-setListTitle">
          {setList.title}
        </h3>
        <p>Notes: {setList.notes}</p>
        {setListTracks.map(track => <SongCard track={track} key={track.id} /> )}
      </div>
    </div>
  )
}