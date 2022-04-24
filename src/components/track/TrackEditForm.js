import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams} from "react-router-dom";
import { addTrack } from "../../modules/TracksManager";
import { updateTrack, getTrackById } from "../../modules/TracksManager";


export const TrackEditForm = () => {

  const loggedInUser = JSON.parse(sessionStorage.getSet_user)
  const navigate = useNavigate()
  const {trackId} = useParams()
  const [isLoading, setIsLoading] = useState(true)

  const [track, setTrack] = useState({
    name: '',
    bpm: '',
    notes: '',
    runTime: '',
    userId: loggedInUser.id,
  })



  const handleFieldChange = evt => {
    const stateToChange = { ...track }
    stateToChange[evt.target.id] = evt.target.value
    if (evt.target.value.includes('bpm')) {
      stateToChange = parseInt(stateToChange)
    }
    setTrack(stateToChange)
  }

  const handleUpdateTrack = (evt) => {
    evt.preventDefault()

    const editedTrack = {
      name: track.name,
      bpm: parseInt(track.bpm),
      notes: track.notes,
      runTime: track.runTime,
      userId: loggedInUser.id,
      id: trackId
    }

    if (track.name === '' || track.bpm === '' || track.notes === '' || track.runTime === '') {
      window.alert("Looks like you forgot something...")
      setIsLoading(false)
    } else {
      setIsLoading(true)
      updateTrack(editedTrack).then(() => navigate('/'))
    }
  }

  useEffect(() => {
    getTrackById(trackId)
    .then(setTrack)
    setIsLoading(false)
  }, [])

  return (
    <form className="trackForm">
      <h2 className="trackForm__title">New Track</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="trackName">Track Name:</label>
          <input type="text" id="name" onChange={handleFieldChange} required autoFocus className="form-control" placeholder="Track Name" value={track.name} />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="bpm">BPM: </label>
          <input type="text" id="bpm" onChange={handleFieldChange} required autoFocus className="form-control" placeholder="BPM Number Only" value={track.bpm} />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="notes">Notes:</label>
          <input type="text" id="notes" onChange={handleFieldChange} required autoFocus className="form-control" placeholder="Notes for track" value={track.notes} />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="runTime">Run Time: </label>
          <input type="text" id="runTime" onChange={handleFieldChange} required autoFocus className="form-control" placeholder="Run Time" value={track.runTime} />
        </div>
      </fieldset>
      <button type="button" onClick={handleUpdateTrack}>Save Track</button>
    </form>
  )
}