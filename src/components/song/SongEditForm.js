import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams} from "react-router-dom";
import { addSong } from "../../modules/SongsManager";
import { updateSong, getSongById } from "../../modules/SongsManager";


export const SongEditForm = () => {

  const loggedInUser = JSON.parse(sessionStorage.getSet_user)
  const navigate = useNavigate()
  const {songId} = useParams()
  const [isLoading, setIsLoading] = useState(true)

  const [song, setSong] = useState({
    name: '',
    bpm: '',
    notes: '',
    runTime: '',
    userId: loggedInUser.id,
  })



  const handleFieldChange = evt => {
    const stateToChange = { ...song }
    stateToChange[evt.target.id] = evt.target.value
    if (evt.target.value.includes('bpm')) {
      stateToChange = parseInt(stateToChange)
    }
    setSong(stateToChange)
  }

  const handleUpdateSong = (evt) => {
    evt.preventDefault()

    const editedSong = {
      name: song.name,
      bpm: parseInt(song.bpm),
      notes: song.notes,
      runTime: song.runTime,
      userId: loggedInUser.id,
      id: songId
    }

    if (song.name === '' || song.bpm === '' || song.notes === '' || song.runTime === '') {
      window.alert("Looks like you forgot something...")
      setIsLoading(false)
    } else {
      setIsLoading(true)
      updateSong(editedSong).then(() => navigate('/'))
    }
  }

  useEffect(() => {
    getSongById(songId)
    .then(setSong)
    setIsLoading(false)
  }, [])

  return (
    <form className="trackForm">
      <h2 className="trackForm__title">New Track</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="trackName">Track Name:</label>
          <input type="text" id="name" onChange={handleFieldChange} required autoFocus className="form-control" placeholder="Track Name" value={song.name} />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="bpm">BPM: </label>
          <input type="text" id="bpm" onChange={handleFieldChange} required autoFocus className="form-control" placeholder="BPM Number Only" value={song.bpm} />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="notes">Notes:</label>
          <input type="text" id="notes" onChange={handleFieldChange} required autoFocus className="form-control" placeholder="Notes for track" value={song.notes} />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="runTime">Run Time: </label>
          <input type="text" id="runTime" onChange={handleFieldChange} required autoFocus className="form-control" placeholder="Run Time" value={song.runTime} />
        </div>
      </fieldset>
      <button type="button" onClick={handleUpdateSong}>Save Track</button>
    </form>
  )
}