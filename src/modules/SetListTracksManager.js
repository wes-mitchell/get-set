import React from "react";

const remoteURL = "http://localhost:8088"

// Gets all set list tracks from API

export const getAllSetListTracks = () => { 
  return fetch(`${remoteURL}/setListTracks?_expand=setList&_expand=song`)
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

// Get all tracks by related setlist

// export const getSetListTracksByCurrentSetList = (currentSetListId) => { 
//   return fetch(`${remoteURL}/setListTracks?setListId=${currentSetListId}`)
//   .then(res => res.json())
//  }