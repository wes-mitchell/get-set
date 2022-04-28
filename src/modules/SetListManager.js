import React from "react";

const remoteURL = "http://localhost:8088"

// Gets all setlists for every user

export const getAllSetLists = () => { 
  return fetch(`${remoteURL}/setLists`)
  .then(res => res.json())
}

// Deletes a setlist by ID

export const deleteSetList = (setListId) => {
  return fetch(`http://localhost:8088/setlists/${setListId}`, {
      method: "DELETE",
      headers: {
          "Content-type": "application/json"
      }
  }).then(response => response.json())
}

// Adds new set list to database

export const addSetList = (newSetList) => { 
  return fetch(`${remoteURL}/setLists`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newSetList)
  }).then(response => response.json())
}

// Updates an existing set list by id with PUT method

export const updateSetList = (setList) => { 
  return fetch(`${remoteURL}/setLists/${setList.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(setList)
  }).then(response => response.json())
 }

// Gets all setlists for every user

export const getSetListById = (setListId) => { 
  return fetch(`${remoteURL}/setLists/${setListId}`)
  .then(res => res.json())
}
