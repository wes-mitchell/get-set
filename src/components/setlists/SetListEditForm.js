import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSetListById } from "../../modules/SetListManager";
import { updateSetList } from "../../modules/SetListManager";
import { getAllSongs } from "../../modules/SongsManager";
import { addSetListTrack, deleteSetListTrack } from "../../modules/SetListTracksManager";
import { getSetListTracksByCurrentSetList } from "../../modules/SetListTracksManager";

export const SetListEditForm = () => {

  const loggedInUser = JSON.parse(sessionStorage.getSet_user)
  const navigate = useNavigate()
  const { setListId } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [songs, setSongs] = useState([])
  const [currentSetListTracks, setCurrentSetListTracks] = useState([])

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
    const updatedSongArr = [...songs]
    // console.log(newSongArr)
    updatedSongArr.find((songItem, index) => {
      if (songItem.id === parseInt(evt.target.id)) {
        songItem.checked = !songItem.checked
        updatedSongArr[index] = songItem
        setSongs(updatedSongArr)
      }
      return null
    })
  }

  const handleControlledInputChange = evt => {
    const stateToChange = { ...setList }
    let selectedVal = evt.target.value
    stateToChange[evt.target.id] = selectedVal
    setSetList(stateToChange)
  }

  const handleClickSaveSetList = (evt) => {
    evt.preventDefault()
    setIsLoading(true)

    const editedSetList = {
      userId: loggedInUser.id,
      title: setList.title,
      notes: setList.notes,
      id: setListId,

    }

    const checkedSong = songs.find(song => song.checked)


    if (editedSetList.notes === '' || editedSetList.title === '' || !checkedSong) {
      window.alert("Looks like you forgot something...")
      setIsLoading(false)
    } else {
      setIsLoading(true)

      Promise.all([updateSetList(editedSetList)
        .then(setListObj => {
          songs.forEach(song => {
              if (song.checked === true && currentSetListTracks.find(setTrack => setTrack.songId === song.id)) {
                const uncheckedSetListTrack = currentSetListTracks.find(setTrack => setTrack.songId === song.id)
                deleteSetListTrack(uncheckedSetListTrack.id)
            } else if (song.checked === true && !currentSetListTracks.find(setTrack => setTrack.songId === song.id)) {
              let newSetListTrack = {
                setListId: setListObj.id,
                songId: song.id
              }
              addSetListTrack(newSetListTrack)
            }
          }
          )
        }).then(() => navigate('/'))
      ])
    }
  }

  useEffect(() => {
    getSetListById(setListId)
      .then(res => setSetList(res))
  }, [])

  useEffect(() => {
    getSetListTracksByCurrentSetList(setListId)
    .then((currentSetListTracksRes) => {
      getAllSongs().then(allSongs => {
        allSongs.forEach(song => {
          song.checked = false
        })
        setSongs(allSongs)
        setCurrentSetListTracks(currentSetListTracksRes)
      })})
  }, [])

return (
  <form className="setListForm">
    <h2 className="setListForm__title">Update Setlist</h2>
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
            <input type="checkbox" id={song.id} value={song.name}
              defaultChecked={currentSetListTracks.find(setListTrack => 
                setListTrack.songId === song.id
              )}
              onChange={handleCheckChange} key={song.id} />
            <label htmlFor="trackName">{song.name}</label>
          </div> 
          : ''
        )}
      </div>
    </fieldset>
    <button type="button" onClick={() => navigate('/')}>Cancel</button>
    <button type="button" onClick={handleClickSaveSetList}>Update Setlist</button>
  </form>
)
}