import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SetListCard } from './SetListCard';
import { getAllSetLists } from '../../modules/SetListManager';
import { getAllUsers } from '../../modules/UsersManager';
import { deleteSong } from '../../modules/SongsManager';
import { deleteSetList } from '../../modules/SetListManager';
import './SetListList.css'

export const SetListList = () => {
  // The initial state is an empty array
  const [setLists, setSetLists] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  const [users, setUsers] = useState([])
  const navigate = useNavigate()
  const loggedInUser = JSON.parse(sessionStorage.getSet_user)

  // Handles the delete setlist gesture when clicked

  const handleDeleteSetList = id => {
    setIsLoading(true)
    deleteSetList(id)
      .then(() => getAllSetLists()
      .then(setSetLists))
      setIsLoading(false)
  }

  // Handles the delete track gesture when clicked

  const handleDeleteSong = (trackID) => {
    setIsLoading(true)
    deleteSong(trackID)
    .then(setIsLoading(false))
  }

  // Handles the edit track button when clicked

  const handleEditSong = (songObj) => {
    
  }


  // ======== get all users from API on component's firs render to match with setListId ========

  useEffect(() => {
    getAllUsers().then(setUsers)
  }, [])

  // ======= get all setLists from the API on the component's first render to match with userId ========

  useEffect(() => {
    getAllSetLists().then(setSetLists);
  }, []);


  // ======= Use .map() to "loop over" the array of setLists that matches the userId array to show a list of setLists to user ========
  return (
    <>
      <div className="container-cards">
        {setLists.map(setList => (setList.userId === loggedInUser.id ? <SetListCard setList={setList} key={setList.id} handleDeleteSong={handleDeleteSong} handleDeleteSetList={handleDeleteSetList} />  : '' ) ) }
        </div>
      {/* <div className="setListButtons">
        <button type="button" 
          className="setListEdit"
          onClick={() => { navigate("/setlist/edit") }}>
          Edit
        </button>
        <button type="button" 
          className="setListDelete"
          onClick={handleDeleteSetList}>
          Delete</button>
        <button type="button" 
          className="setListPractice"
          onClick={() => navigate("/setlist/practice")}
          >Practice</button>
      </div> */}
    </>
  )
}