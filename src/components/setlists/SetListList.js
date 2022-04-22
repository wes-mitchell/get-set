import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SetListCard } from './SetListCard';
import { getAllSetLists } from '../../modules/SetListManager';
import { getAllUsers } from '../../modules/UsersManager';

export const SetListList = () => {
  // The initial state is an empty array
  const [setLists, setSetLists] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  const [users, setUsers] = useState([])
  const navigate = useNavigate()

  // Handles the delete setlist gesture when clicked

  // const handleDeleteSetList = id => {
  //   deleteSetList(id)
  //     .then(() => getAllAnimals().then(setAnimals))
  // }

  // Handles the delete track gesture when clicked

  // const handleDeleteTrack = (trackObj) => {
  //   setIsLoading(true)
  //   const deltedTrack = { ...trackObj }
  // }

  // Handles the edit track button when clicked

  const handleEditTrack = (trackObj) => {

  }

  const loggedInUser = JSON.parse(sessionStorage.getSet_user)

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
        {setLists.map(setList => (setList.userId === loggedInUser.id ? <SetListCard setList={setList} key={setList.id} />  : '' ) ) }
      </div>
    </>
  )
}