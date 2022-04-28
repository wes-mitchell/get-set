import React from "react";
import { useState, useEffect } from "react";
import { getAllSongs } from "../../modules/SongsManager";
import { SongListCard } from "./SongListCard";
import { deleteSong } from "../../modules/SongsManager";
import './SongList.css'

export const SongList = () => { 
  const [songs, setSongs] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const loggedInUser = JSON.parse(sessionStorage.getSet_user)

  // handles delete song gesture by deleting the song from the database

  const handleDeleteSong = id => {
    setIsLoading(true)
    deleteSong(id)
    setIsLoading(false)
  } 

  // sets all songs from user on initial render

  useEffect(() => {
  getAllSongs()
  .then(allSongs => setSongs(allSongs))
}, [])

// listens for is loading to trigger re render upon delete track gesture

useEffect(() => {
  getAllSongs()
  .then(allSongs => setSongs(allSongs))
}, [isLoading])

  return (
    <>
    <div className="songListContainer">
        {songs.map(song => song.userId === loggedInUser.id ? <SongListCard key={song.id} song={song} handleDeleteSong={handleDeleteSong} /> : '' )}
    </div>
    </>
      )
}