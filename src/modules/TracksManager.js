import React from "react";

const remoteURL = "http://localhost:8088"

// Gets all tracks from API

export const getAllTracks = () => { 
  return fetch(`${remoteURL}/tracks`)
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