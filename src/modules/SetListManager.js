import React from "react";

const remoteURL = "http://localhost:8088"

// Gets all setlists for every user

export const getAllSetLists = () => { 
  return fetch(`${remoteURL}/setLists`)
  .then(res => res.json())
}
