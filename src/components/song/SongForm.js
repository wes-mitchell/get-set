import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addSong } from "../../modules/SongsManager";
import "./SongForm.css"


export const SongForm = () => {

  const loggedInUser = JSON.parse(sessionStorage.getSet_user)
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)

  const [song, setSong] = useState({
    name: '',
    bpm: parseInt(0),
    notes: '',
    runTime: '',
    userId: loggedInUser.id,
  })

  const integerCheck = (evt) => {
    const newSong = { ...song }
    newSong.bpm = parseInt(evt.target.value)
    setSong(newSong)
  }


  const handleControlledInputChange = evt => {
    const newSong = { ...song }
    let selectedVal = evt.target.value
    newSong[evt.target.id] = selectedVal
    if (evt.target.id.includes('bpm')) {
      selectedVal = parseInt(selectedVal)
    }
    setSong(newSong)
  }

  const handleClickSaveSong = (evt) => {
    evt.preventDefault()

    if (song.name === '' || song.notes === '' || song.runTime === '') {
      window.alert("Looks like you forgot something...")
      setIsLoading(false)
    } else if (Number.isInteger(song.bpm) === false) {
      window.alert("Please only use a number for bpm marking")
      setIsLoading(false)
    } else {
      setIsLoading(true)
      addSong(song).then(() => navigate('/'))
    }
  }

  return (
    <div className="songFormContainer">
    <form className="trackForm">
      <h2 className="trackForm__title">Add A Track</h2>
      <fieldset>
        <div className="songFormTrackName">
          <label htmlFor="trackName">Track Name:</label>
          <input type="text" id="name" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Track Name" value={song.name} />
        </div>
      </fieldset>
      <fieldset>
        <div className="songFormTrackNotes">
          <label htmlFor="notes">Notes:</label>
          <input type="text" id="notes" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Notes for track" value={song.notes} />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group-bpm">
          <label htmlFor="bpm">BPM: </label>
          <input type="number" id="bpm" onChange={integerCheck} required autoFocus className="form-control" placeholder="BPM"  />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group-runTime">
          <label htmlFor="runTime">Run Time: </label>
          <input type="text" id="runTime" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="X:XX" value={song.runTime} />
        </div>
      </fieldset>
      <button type="button" onClick={handleClickSaveSong} className="saveTrackButton">Save Track</button>
    </form>
    </div>
  )
}