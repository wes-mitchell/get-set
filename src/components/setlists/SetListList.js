import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SetListCard } from './SetListCard';
import { getSetListsByUserId } from '../../modules/SetListManager';
import { getUserById } from '../../modules/UsersManager';
import { deleteSong, getSongById } from '../../modules/SongsManager';
import { deleteSetList } from '../../modules/SetListManager';
import { getAllSetListTracks, deleteSetListTrack, getSetListTracksByCurrentSetList } from '../../modules/SetListTracksManager';
import { getAllSongs } from '../../modules/SongsManager';
import { NoteCard } from '../notes/NoteCard';
import './SetListList.css'

export const SetListList = () => {
  // The initial state is an empty array

  const [user, setUser] = useState({})
  const [setLists, setSetLists] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()
  const [dialogVisible, setDialogVisible] = useState(false)
  const [song, setSong] = useState([])
  const [setListTracks, setSetListTracks] = useState([])
  const loggedInUser = JSON.parse(sessionStorage.getSet_user)

  // Handles the delete setlist gesture when clicked by passing set list id as parameter

  const handleDeleteSetList = setListId => {
    setIsLoading(true)
    Promise.all([getSetListTracksByCurrentSetList(setListId)
      .then(setListTracks => setListTracks.forEach(setListTrack => {
        deleteSetListTrack(setListTrack.id)
      })).then(deleteSetList(setListId))
          .then(() => getSetListsByUserId(user.id))
          .then(setLists => setSetLists(setLists))
        ]) 
          setIsLoading(false)
  }

  // Handles the delete track gesture when clicked from home page

  const handleDeleteSetListTrack = (setListTrackId) => {
    setIsLoading(true)
      deleteSetListTrack(setListTrackId)
      .then(() => getAllSetListTracks())
      .then(res => setSetListTracks(res))
      setIsLoading(false)
    }

    // handles notes gesture click by opening dialog box w/ notes for song upon button click

    const handleNoteGesture = (setListTrack) => {
      setIsLoading(true)
      getSongById(setListTrack.song.id)
      .then(song => setSong(song))
      setIsLoading(false)
    }


  // ======== get all users from API on component's first render to match with setListId ========

  useEffect(() => {
    getUserById(loggedInUser.id)
    .then(res => setUser(res))
  }, [])

  // ======= get all setLists from the API on the component's first render to match with userId ========

  useEffect(() => {
    getSetListsByUserId(loggedInUser.id)
    .then(res => setSetLists(res));
  }, [setListTracks]);



  // useEffect(() => {
  //   getAllSetLists()
  //   .then(setSetLists);
  // }, [setListTracks]);  


  // ======= Use .map() to "loop over" the array of setLists that matches the userId array to show a list of setLists to user ========
  
  return (
    <>
    <div className='welcomeMessage'>
      <h1>{user.name}'s Setlists</h1>
    </div>
      <dialog className="dialog" id={"dialogBox"} open={dialogVisible}>
        <NoteCard song={song} />
        <button className="closeButton" onClick={() => {setDialogVisible(false)}}>Close</button>
      </dialog>
      <div className="container-cards">
        {setLists.map(setList => <SetListCard setList={setList} key={setList.id} user={user} handleDeleteSetListTrack={handleDeleteSetListTrack} handleDeleteSetList={handleDeleteSetList} setDialogVisible={setDialogVisible} handleNoteGesture={handleNoteGesture}/>)}
      </div>
    </>
  )
}