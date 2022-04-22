import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SetListCard } from './SetListCard';
import { getAllSetLists } from '../../modules/SetListManager';
import { getAllUsers } from '../../modules/UsersManager';
import { deleteTrack } from '../../modules/TracksManager';
import { deleteSetList } from '../../modules/SetListManager';

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

  const handleDeleteTrack = (trackID) => {
    setIsLoading(true)
    deleteTrack(trackID)
    .then(setIsLoading(false))
  }

  // Handles the edit track button when clicked

  const handleEditTrack = (trackObj) => {

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
      <section className="section-content">
        <button type="button"
          className="btn"
          onClick={() => { navigate("/setlist/create") }}>
          New Setlist
        </button>
      </section>
      <div className="container-cards">
        {setLists.map(setList => (setList.userId === loggedInUser.id ? <SetListCard setList={setList} key={setList.id} handleDeleteTrack={handleDeleteTrack}/>  : '' ) ) }
      </div>
      <div className="setListButtons">
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
      </div>
    </>
  )
}