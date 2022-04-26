import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getAllSetListTracks } from "../../modules/SetListTracksManager";
import { SongCard } from "../song/SongCard";
import "./SetListCard.css"

export const SetListCard = ({ setList, handleDeleteSetList, handleEditSong, handleAddNotes }) => {
  const [setListTracks, setSetListTracks] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()
  // const { setListId } = useParams()

  // Takes a set array as a parameter and returns all tracks related to current setlist by id

  const thisSetList = (setArr) => {
    return setArr.filter(setListTrack => {
      console.log(setList)
      return setListTrack.setListId === setList.id
    })
  }


  useEffect(() => {
    console.log(setList)
    getAllSetListTracks()
      .then(res => {
       const filteredList = thisSetList(res)
      console.log(filteredList)
      return filteredList
    })
      .then(res => setSetListTracks(res))
  }, [setList])

  return (
    <>
      <div>
        <div className="card">
          <div className="card-content">
            <h3 className="card-setListTitle">
              {setList.title}
            </h3>
            <p>Notes: {setList.notes}</p>
            {setListTracks.map(track => <SongCard track={track} key={track.id} />)}
          </div>
        </div>
        <div className="setListButtons">
          <button type="button"
            className="setListEdit"
            onClick={() => { navigate("/setlist/edit") }}>
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