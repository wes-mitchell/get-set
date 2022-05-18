import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { SetListCard } from "./SetListCard";
import { getSetListById } from "../../modules/SetListManager";
import { getSongById } from "../../modules/SongsManager";
import { NoteCard } from '../notes/NoteCard';
import { deleteSetListTrack } from "../../modules/SetListTracksManager";
import { getAllSetLists, deleteSetList, getSetListsByUserId } from "../../modules/SetListManager";
import { getSetListTracksByCurrentSetList } from "../../modules/SetListTracksManager";
import './SetListPracticeView.css'

export const SetListPracticeView = () => {
  const [setList, setSetList] = useState({})
  const [song, setSong] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [dialogVisible, setDialogVisible] = useState(false)
  const { setListId } = useParams()
  const [setLists, setSetLists] = useState([])
  const navigate = useNavigate()

  // Handles delete setlist from the practice view

  const handleDeleteSetList = (setListId) => {
    setIsLoading(true)
    Promise.all([getSetListTracksByCurrentSetList(setListId)
      .then(setListTracks => setListTracks.forEach(setListTrack => {
        deleteSetListTrack(setListTrack.id)
      })).then(deleteSetList(setListId))
      .then(() => navigate('/'))])
  }


  // handles notes gesture click by opening dialog box w/ notes for song upon button click

  const handleNoteGesture = (setListTrack) => {
    setIsLoading(true)
    getSongById(setListTrack.song.id)
      .then(song => setSong(song))
    setIsLoading(false)
  }

  // Handles the delete track gesture when clicked from practice view 

  const handleDeleteSetListTrack = (setListTrackId) => {
    setIsLoading(true)
    Promise.all([deleteSetListTrack(setListTrackId)
      .then(() => getSetListById(setListId))
      .then((res) => setSetList(res))])
    setIsLoading(false)
  }

  useEffect(() => {
    getSetListById(setListId)
      .then(res => setSetList(res))
    setIsLoading(false)
  }, [])


  return (
    <>
      <dialog className="dialog" id={"dialogBox"} open={dialogVisible}>
        <NoteCard song={song} />
        <button className="closeButton" onClick={() => { setDialogVisible(false) }}>Close</button>
      </dialog>
      <div className="practiceViewContainer">
        <SetListCard setList={setList} handleDeleteSetList={handleDeleteSetList} handleNoteGesture={handleNoteGesture} setDialogVisible={setDialogVisible} handleDeleteSetListTrack={handleDeleteSetListTrack} />
      </div>
    </>
  )
}