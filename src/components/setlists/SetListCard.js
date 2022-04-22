import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {getAllSetLists, getAllTracks} from '../../modules/SetListManager'
import { TrackCard } from "../track/TrackCard";

export const SetListCard = ({ handleDeleteTrack, handleEditTrack, handleAddNotes, setList }) => {
  // const [tracks, setTracks] = useState([])
  // const [setLists, setSetList] = useState([])
  // const [setUser, setSetUser] = ([])

  // useEffect(() => {
  //   getAllTracks().then(setTracks)
  // }, [])

  // useEffect(() => {
  //   getAllSetLists()
  // })


  // Test dummy track Obj to see Track Card within SetList
  const tracks = [
  {
    "id": 1,
    "name": "I Wish You Were Here Go Damnit",
    "bpm": 95,
    "notes": "example notes",
    "runTime": "3:25"
  },
  {
    "id": 1,
    "name": "Good Times, Bad Times",
    "bpm": 50,
    "notes": "example notes",
    "runTime": "3:25"
  }
]


  return (
    <div className="card">
      <div className="card-content">
        <h3>
          <span className="card-setListTitle">
            {/* {setList.title} */}
          </span>
        </h3>
        {/* <p>Notes: {setList.notes}</p> */}
        {tracks.map(track => <TrackCard track={track} key={track.id} /> ) }
        </div>
      </div>
  )
}