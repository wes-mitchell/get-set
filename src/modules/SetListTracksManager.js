import React from "react";

const remoteURL = "http://localhost:8088"

// Gets all set list tracks from API

export const getAllSetListTracks = () => { 
  return fetch(`${remoteURL}/setListTracks`)
  .then(res => res.json())
}