import React from "react";

const remoteURL = "http://localhost:8088"

// Gets all tracks from API and sorts them in alphabetical order

export const getAllSongs = () => { 
  return fetch(`${remoteURL}/songs?_sort=name&_order=asc`)
  .then(res => res.json())
}

// Returns one track from database fetched by id

export const getSongById = (songId) => {
  return fetch(`${remoteURL}/songs/${songId}`)
  .then(res => res.json())
}

// Deletes track with reference to track id

export const deleteSong = (songId) => {
  return fetch(`http://localhost:8088/songs/${songId}`, {
      method: "DELETE",
      headers: {
          "Content-type": "application/json"
      }
  }).then(response => response.json())
}

// Adds new track to database

export const addSong = (newSong) => { 
  return fetch(`${remoteURL}/songs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newSong)
  }).then(response => response.json())
}

// Fetches track by id and updates database with info from edit form

export const updateSong = (editedSong) => { 
  return fetch(`${remoteURL}/songs/${editedSong.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(editedSong)
  }).then(data => data.json())
 }