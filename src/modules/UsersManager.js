import React from "react";

const remoteURL = "http://localhost:8088"

// Gets all users from API

export const getAllUsers = () => { 
  return fetch(`${remoteURL}/users`)
  .then(res => res.json())
}

// Gets user by ID from API

export const getUserById = (userId) => { 
  return fetch(`${remoteURL}/users/${userId}`)
  .then(res => res.json())
}