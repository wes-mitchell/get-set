import MetronomeMin from "@kevinorriss/react-metronome";
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SongCard } from "../song/SongCard";
import { getSetListTracksByCurrentSetList } from "../../modules/SetListTracksManager";
import "./SetListCard.css"



export const SetListCard = ({ setList, handleDeleteSetList, handleDeleteSetListTrack, setDialogVisible, handleNoteGesture }) => {
  const [setListTracks, setSetListTracks] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const {setListId} = useParams()
  const [firstBPM, setFirstBPM] = useState(null)
  const [currentSetList, setCurrentSetList] = useState([])
  const navigate = useNavigate()
  
  // Sets state of all set list tracks related to current users setlists

  useEffect(() => {
    getSetListTracksByCurrentSetList(setList.id)
    .then(setListTracks => {
      setFirstBPM(setListTracks[0].song?.bpm)
      setSetListTracks(setListTracks)
    })
  }, [setList])


    return (
      <>
      <div className="card-container">
      {
        window.location.href.indexOf("practice") > -1 ? 
        firstBPM === null ? '' : 
        <div className="metronomeContainer">
            <MetronomeMin startBpm={firstBPM} />
        </div>
           : ''
      }
        <div className="card">
          <div className="card-content">
            <div className="card-setListTitle">
              {setList.title}
            </div>
            <p className="setListNotes">{setList.notes}</p>
            {setListTracks.map(track => <SongCard currentSetList={currentSetList} track={track} key={track.id} setList={setList} handleDeleteSetListTrack={handleDeleteSetListTrack} setDialogVisible={setDialogVisible} handleNoteGesture={handleNoteGesture} setCurrentSetList={setCurrentSetList}/>)}
          </div>
        </div>
        { window.location.href.indexOf("practice") > -1 ?
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
          </div> : 
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
        }       
      </div>
    </>
  )
}