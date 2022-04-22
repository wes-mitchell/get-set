import React, { useState, useEffect } from 'react';
//import the components we will need
import { SetListCard } from './SetListCard';
import { getAllSetLists } from '../../modules/SetListManager';
import { useNavigate } from 'react-router-dom';

export const SetListList = () => {
  // The initial state is an empty array
  const [setLists, setSetLists] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  const getSetLists = () => {
    return getAllSetLists().then(setListsFromAPI => {
      setSetLists(setListsFromAPI)
    })
  }

// Handles the delete setlist gesture when clicked

  const handleDeleteSetList = id => {
    deleteAnimal(id)
    .then(() => getAllAnimals().then(setAnimals))
  }

// Handles the delete track gesture when clicked

  const handleDeleteTrack = (trackObj) => {
    setIsLoading(true)
    const dischargedAnimal = {...animalObj}
    dischargedAnimal.isDischarged = "true"
    updateAnimal(dischargedAnimal).then(getAnimals)
  }

// Handles the edit track button when clicked

  const handleEditTrack = (trackObj) => {

}


  // got the animals from the API on the component's first render
  useEffect(() => {
    getAnimals();
  }, []);

  // Finally we use .map() to "loop over" the animals array to show a list of animal cards
  return (
    <>
    <section className="section-content">
      <button type="button"
              className="btn"
              onClick={() => {navigate("/animals/create")}}>
              Admit Animal
      </button>
    </section>
    <div className="container-cards">
      {animals.map(animal => <AnimalCard animal={animal} key={animal.id} handleDischarge={handleDischarge}/>)}
    </div>
    </>
  );
};