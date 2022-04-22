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
