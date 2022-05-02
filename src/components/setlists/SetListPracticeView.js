import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { SetListCard } from "./SetListCard";
import { getSetListById } from "../../modules/SetListManager";
import { getSongById } from "../../modules/SongsManager";
import { NoteCard } from '../notes/NoteCard';
import './SetListPracticeView.css'

export const SetListPracticeView = ({}) => { 
  const [setList, setSetList] = useState({})
  const [song, setSong] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [dialogVisible, setDialogVisible] = useState(false)
  const {setListId} = useParams()

  // handles notes gesture click by opening dialog box w/ notes for song upon button click

  const handleNoteGesture = (setListTrack) => {
    setIsLoading(true)
    getSongById(setListTrack.song.id)
    .then(song => setSong(song))
    setIsLoading(false)
    console.log("practice view notes clicked")
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
        <button className="closeButton" onClick={() => {setDialogVisible(false)}}>Close</button>
    </dialog>
    <div className="practiceViewContainer">
    <SetListCard setList={setList} handleNoteGesture={handleNoteGesture} setDialogVisible={setDialogVisible}/>
    </div>
    <p className="metronome">Metronome goes here as stretch Goal</p>
    </>
  )
 }