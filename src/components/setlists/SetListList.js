import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SetListCard } from './SetListCard';
import { getAllSetLists } from '../../modules/SetListManager';
import { getAllUsers } from '../../modules/UsersManager';
import { deleteSong, getSongById } from '../../modules/SongsManager';
import { deleteSetList } from '../../modules/SetListManager';
import { getAllSetListTracks, deleteSetListTrack, getSetListTracksByCurrentSetList } from '../../modules/SetListTracksManager';
import { getAllSongs } from '../../modules/SongsManager';
import { NoteCard } from '../notes/NoteCard';
import './SetListList.css'

export const SetListList = () => {
  // The initial state is an empty array

  const [setLists, setSetLists] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  const [users, setUsers] = useState([])
  const [songs, setSongs] = useState([])
  const navigate = useNavigate()
  const [dialogVisible, setDialogVisible] = useState(false)
  const [song, setSong] = useState([])
  const loggedInUser = JSON.parse(sessionStorage.getSet_user)

  // Handles the delete setlist gesture when clicked by passing set list id as parameter

  const handleDeleteSetList = id => {
    setIsLoading(true)
    Promise.all([getAllSetListTracks(setListTracks => {
      setListTracks.forEach(setListTrack => {
        if (setListTrack.setListId === id) {
          deleteSetListTrack(setListTrack.id)
        }
      });
    }).then(deleteSetList(id))
      .then(() => getAllSetLists())
      .then(res => setSetLists(res))])
    setIsLoading(false)
  }

  // Handles the delete track gesture when clicked from home page

  const handleDeleteSetListTrack = (setListTrackId) => {
      setIsLoading(true)
      deleteSetListTrack(setListTrackId)
      setIsLoading(false)
    }

    // handles notes gesture click

    const handleNoteGesture = (setListTrack) => {
      setIsLoading(true)
      getSongById(setListTrack.song.id)
      .then(song => setSong(song))
      setIsLoading(false)
    }


  // ======== get all users from API on component's first render to match with setListId ========

  useEffect(() => {
    getAllUsers()
    .then(setUsers)
  }, [])

  // ======= get all setLists from the API on the component's first render to match with userId ========

  useEffect(() => {
    getAllSetLists()
    .then(setSetLists);
  }, []);
  
  // ===== get
  
  useEffect(() => {
    getAllSetLists()
    .then(setSetLists);
  }, [isLoading]);

  // ========= get

  useEffect(() => {
    getAllSongs()
    .then(setSongs)
  }, [])


  // ======= Use .map() to "loop over" the array of setLists that matches the userId array to show a list of setLists to user ========
  return (
    <>
      <dialog className="dialog" id={''} open={dialogVisible}>
        <NoteCard song={song} />
        <button className="closeButton" onClick={() => {setDialogVisible(false)}}>Close</button>
      </dialog>
      <div className="container-cards">
        {setLists.map(setList => (setList.userId === loggedInUser.id ? <SetListCard setList={setList} key={setList.id} handleDeleteSetListTrack={handleDeleteSetListTrack} handleDeleteSetList={handleDeleteSetList} setDialogVisible={setDialogVisible} handleNoteGesture={handleNoteGesture}/> : ''))}
      </div>
    </>
  )
}