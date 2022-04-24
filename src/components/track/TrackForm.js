import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addTrack } from "../../modules/TracksManager";


export const TrackForm = () => {

  const loggedInUser = JSON.parse(sessionStorage.getSet_user)
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)

  const [track, setTrack] = useState({
    name: '',
    bpm: parseInt(''),
    notes: '',
    runTime: '',
    userId: loggedInUser.id,
  })



  const handleControlledInputChange = evt => {
    const newTrack = { ...track }
    let selectedVal = evt.target.value
    if (evt.target.id.includes('bpm')) {
      selectedVal = parseInt(selectedVal)
    }
    newTrack[evt.target.id] = selectedVal
    setTrack(newTrack)
    console.log(newTrack);
  }

  const handleClickSaveTrack = (evt) => {
    evt.preventDefault()

    if (track.name === '' || track.notes === '' || track.runTime === '') {
      window.alert("Looks like you forgot something...")
      setIsLoading(false)
    } else if (Number.isInteger(track.bpm) === false) {
      window.alert("Please only use a number for bpm marking")
      setIsLoading(false)
    } else {
      setIsLoading(true)
      addTrack(track).then(() => navigate('/'))
    }
  }

  return (
    <form className="trackForm">
      <h2 className="trackForm__title">New Track</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="trackName">Track Name:</label>
          <input type="text" id="name" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Track Name" value={track.name} />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="bpm">BPM: </label>
          <input type="number" id="bpm" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="BPM Number Only" value={parseInt(track.bpm)} />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="notes">Notes:</label>
          <input type="text" id="notes" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Notes for track" value={track.notes} />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="runTime">Run Time: </label>
          <input type="text" id="runTime" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Run Time" value={track.runTime} />
        </div>
      </fieldset>
      <button type="button" onClick={handleClickSaveTrack}>Save Track</button>
    </form>
  )
}