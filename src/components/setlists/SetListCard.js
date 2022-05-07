import MetronomeMin from "@kevinorriss/react-metronome";
import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getAllSetListTracks } from "../../modules/SetListTracksManager";
import { SongCard } from "../song/SongCard";
import { getAllSongs } from "../../modules/SongsManager";
import { getSetListTracksByCurrentSetList } from "../../modules/SetListTracksManager";
import "./SetListCard.css"



export const SetListCard = ({ setList, handleDeleteSetList, handleDeleteSetListTrack, setDialogVisible, handleNoteGesture }) => {
  const [setListTracks, setSetListTracks] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const {setListId} = useParams()
  const [allSongs, setAllSongs] = useState([])
  const navigate = useNavigate()
  const [trackIndex, setTrackIndex] = useState(0)
  const [firstBPM, setFirstBPM] = useState(null)
  const [currentSetList, setCurrentSetList] = useState([])

  // const setbpm = () => {
  //     setFirstBPM(null)
  //     setTrackIndex(trackIndex + 1)
  //     setFirstBPM(setListTracks[trackIndex].song.bpm)
  // }

  // Takes a set array as a parameter and returns all tracks related to current setlist by id

  const thisSetList = (setArr) => {
    return setArr.filter(setListTrack => {
      return setListTrack.setListId === setList.id
    })
  }

  useEffect(() => {
    getAllSongs()
    .then(res => setAllSongs(res))
    setIsLoading(false)
  }, [])


  useEffect(() => {
    getAllSetListTracks()
      .then(res => {
       const filteredList = thisSetList(res)
      return filteredList
    })
      .then(res => {
        setFirstBPM(res[0].song?.bpm)
        setSetListTracks(res)
      })
    }, [setList])

    useEffect(() => {
      getSetListTracksByCurrentSetList(setListId)
      .then(res => setCurrentSetList(res))
    }, [])
    
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