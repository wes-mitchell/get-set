import React from "react";

const remoteURL = "http://localhost:8088"

// Gets all tracks from API and sorts them in alphabetical order

export const getAllTracks = () => { 
  return fetch(`${remoteURL}/tracks?_sort=name&_order=asc`)
  .then(res => res.json())
}

// Returns one track from database fetched by id

export const getTrackById = (trackId) => {
  return fetch(`${remoteURL}/tracks/${trackId}`)
  .then(res => res.json())
}

// Deletes track with reference to track id

export const deleteTrack = (trackId) => {
  return fetch(`http://localhost:8088/tracks/${trackId}`, {
      method: "DELETE",
      headers: {
          "Content-type": "application/json"
      }
  }).then(response => response.json())
}

// Adds new track to database

export const addTrack = (newTrack) => { 
  return fetch(`${remoteURL}/tracks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newTrack)
  }).then(response => response.json())
}

// Fetches track by id and updates database with info from edit form

export const updateTrack = (editedTrack) => { 
  return fetch(`${remoteURL}/tracks/${editedTrack.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(editedTrack)
  }).then(data => data.json())
 }