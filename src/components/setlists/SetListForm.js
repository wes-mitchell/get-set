import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addSetList } from "../../modules/SetListManager";
import { getAllSongs } from "../../modules/SongsManager";
import './SetListForm.css'



export const SetListForm = () => {

  const loggedInUser = JSON.parse(sessionStorage.getSet_user)
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [tracks, setTracks] = useState([])

  const [setList, setSetList] = useState({
    userId: loggedInUser.id,
    title: '',
    notes: ''
  })

  const handleControlledInputChange = evt => {
    const newSetList = { ...setList }
    let selectedVal = evt.target.value
    newSetList[evt.target.id] = selectedVal
    setSetList(newSetList)
  }

  const handleClickSaveSetList = (evt) => {
    evt.preventDefault()

    if (setList.notes === '' || setList.title === '') {
      window.alert("Looks like you forgot something...")
      setIsLoading(false)
    } else {
      setIsLoading(true)
      addSetList(setList).then(() => navigate('/'))
    }
  }

  useEffect(() => {
    getAllSongs().then(setTracks)
  }, [])

  return (
    <form className="setListForm">
      <h2 className="setListForm__title">New Setlist</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="setListTitle">Setlist Title:</label>
          <input type="text" id="title" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Title for setlist" value={setList.title} />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="notes">Notes: </label>
          <input type="text" id="notes" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder='i.e. "practice" | "festival gig"' value={setList.notes} />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          {tracks.map((track) => track.userId === loggedInUser.id ?
            <div key={track.id}>
              <input type="checkbox" id={track.id} value={track.name} key={track.id} />
              <label htmlFor="trackName">{track.name}</label>
            </div> : ''
          )}
        </div>
      </fieldset>
      <button type="button" onClick={handleClickSaveSetList}>Save Setlist</button>
    </form>
  )
}