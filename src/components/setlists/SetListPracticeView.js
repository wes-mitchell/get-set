import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { SetListCard } from "./SetListCard";
import { getSetListById } from "../../modules/SetListManager";
import './SetListPracticeView.css'
import { getAllSetListTracks } from "../../modules/SetListTracksManager";

export const SetListPracticeView = () => { 
  const [setList, setSetList] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [setListTracks, setSetListTracks] = useState([])

  const {setListId} = useParams()


  useEffect(() => {
    getSetListById(setListId)
    .then(res => setSetList(res))
    setIsLoading(false)
  }, [])

  return (
    <>
    <SetListCard setList={setList} />
    <p className="metronome">Metronome goes here as stretch Goal</p>

    </>
  )
 }