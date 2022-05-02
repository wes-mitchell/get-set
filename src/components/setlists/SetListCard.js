import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getAllSetListTracks } from "../../modules/SetListTracksManager";
import { SongCard } from "../song/SongCard";
import "./SetListCard.css"

export const SetListCard = ({ setList, handleDeleteSetList, handleDeleteSetListTrack, setDialogVisible, handleNoteGesture, handleNoteClickPracticeView }) => {
  const [setListTracks, setSetListTracks] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  // Takes a set array as a parameter and returns all tracks related to current setlist by id

  const thisSetList = (setArr) => {
    return setArr.filter(setListTrack => {
      return setListTrack.setListId === setList.id
    })
  }


  useEffect(() => {
    getAllSetListTracks()
      .then(res => {
       const filteredList = thisSetList(res)
      return filteredList
    })
      .then(res => setSetListTracks(res))
  }, [setList])

  return (
    <>
      <div className="card-container">
        <div className="card">
          <div className="card-content">
            <div className="card-setListTitle">
              {setList.title}
            </div>
            <p className="setListNotes">{setList.notes}</p>
            {setListTracks.map(track => <SongCard track={track} key={track.id} setList={setList} handleDeleteSetListTrack={handleDeleteSetListTrack} setDialogVisible={setDialogVisible} handleNoteGesture={handleNoteGesture} />)}
          </div>
        </div>
        <div className="setListButtons">
          <button type="button"
            className="setListEdit"
            onClick={() => { navigate(`/setlist/${setList.id}/edit`) }}>
            Edit
          </button>
          <button type="button"
            className="setListDelete"
            onClick={() => handleDeleteSetList(setList.id)}>
            Delete</button>
          <button type="button"
            className="setListPractice"
            onClick={() => navigate(`/setlist/${setList.id}/practice`)}
          >Practice</button>
        </div>
      </div>
    </>
  )
}