import React from "react";

const remoteURL = "http://localhost:8088"

// Gets all tracks from API

export const getAllTracks = () => { 
  return fetch(`${remoteURL}/tracks`)
  .then(res => res.json())
}