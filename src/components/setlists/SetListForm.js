import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addSetList, getAllSetLists, getSetListById } from "../../modules/SetListManager";
import { getAllSongs } from "../../modules/SongsManager";
import { addSetListTrack } from "../../modules/SetListTracksManager";
import './SetListForm.css'



export const SetListForm = () => {

  const loggedInUser = JSON.parse(sessionStorage.getSet_user)
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [songs, setSongs] = useState([])

  const [setListTrack, setSetListTrack] = useState({
    setListId: '',
    songId: ''
  })

  const [setList, setSetList] = useState({
    userId: loggedInUser.id,
    title: '',
    notes: ''
  })

  const handleCheckChange = (evt) => {
    const newSongArr = [...songs]
    console.log(newSongArr)
    newSongArr.find((songItem, index) => {
      if (songItem.id === parseInt(evt.target.id)) {
        songItem.checked = !songItem.checked
        newSongArr[index] = songItem
        setSongs(newSongArr)
      }
      return null
    })
  }

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

      Promise.all([addSetList(setList)
        .then(setListObj => {
          songs.forEach(song => {
            if (song.checked === true) {
              let newSetListTrack = {
                setListId: setListObj.id,
                songId: song.id
              }
              addSetListTrack(newSetListTrack)
                .then(() => navigate('/'))
            }
          }
          )
        })
      ])
  }
}



      useEffect(() => {
        getAllSongs()
          .then(res => {
            console.log(res);
            res.forEach(element => {
              element.checked = false
            })
            console.log(res)
            return res
          }).then((res) => setSongs(res))
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
              {songs.map((song) => song.userId === loggedInUser.id ?
                <div key={song.id}>
                  <input type="checkbox" id={song.id} value={song.name} checked={song.checked} onChange={handleCheckChange} key={song.id} />
                  <label htmlFor="trackName">{song.name}</label>
                </div> : ''
              )}
            </div>
          </fieldset>
          <button type="button" onClick={handleClickSaveSetList}>Save Setlist</button>
        </form>
      )
    }