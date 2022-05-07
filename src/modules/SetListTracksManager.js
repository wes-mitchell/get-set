import React from "react";

const remoteURL = "http://localhost:8088"

// Gets all set list tracks from API

export const getAllSetListTracks = () => { 
  return fetch(`${remoteURL}/setListTracks?_expand=setList&_expand=song`)
  .then(res => res.json())
}

// Gets set list track by ID

export const getSetListTrackById = (trackId) => { 
  return fetch(`${remoteURL}/setListTracks/${trackId}`)
  .then(res => res.json())
}

// Adds new set list track to database

export const addSetListTrack = (newSetListTrack) => { 
  return fetch(`${remoteURL}/setListTracks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newSetListTrack)
  }).then(response => response.json())
}

// deletes a set list track by id

export const deleteSetListTrack = (setListTrackId) => {
  return fetch(`http://localhost:8088/setListTracks/${setListTrackId}`, {
      method: "DELETE",
      headers: {
          "Content-type": "application/json"
      }
  }).then(response => response.json())
}

// Get all tracks by related setlist

export const getSetListTracksByCurrentSetList = (currentSetListId) => { 
  return fetch(`${remoteURL}/setListTracks?setListId=${currentSetListId}&_expand=song`)
  .then(res => res.json())
 }

 // Get set list track by id and patch with updated info

 export const updateSetListTrack = (editedSetListTrack) => { 
  return fetch(`${remoteURL}/setListTracks/${editedSetListTrack.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      listOrder: editedSetListTrack.listOrder
    })
  }).then(data => data.json())
 }

 export const getSetListTracksByCurrentSetListNoExpand = (currentSetListId) => { 
  return fetch(`${remoteURL}/setListTracks?setListId=${currentSetListId}`)
  .then(res => res.json())
 }
