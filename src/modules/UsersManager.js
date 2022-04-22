import React from "react";

const remoteURL = "http://localhost:8088"

// Gets all users from API

export const getAllUsers = () => { 
  return fetch(`${remoteURL}/users`)
  .then(res => res.json())
}