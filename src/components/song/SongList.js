import React from "react";
import { useState, useEffect } from "react";
import { getAllSongs } from "../../modules/SongsManager";
import { SongListCard } from "./SongListCard";
import { deleteSong } from "../../modules/SongsManager";
import './SongList.css'

export const SongList = () => { 
  const [songs, setSongs] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // handles delete song gesture by deleting the song from the database

  const handleDeleteSong = id => {
    setIsLoading(true)
    deleteSong(id)
    setIsLoading(false)
  }

  useEffect(() => {
  getAllSongs()
  .then(allSongs => setSongs(allSongs))
}, [])

useEffect(() => {
  getAllSongs()
  .then(allSongs => setSongs(allSongs))
}, [isLoading])

  return (
    <>
    <div className="songListContainer">
        {songs.map(song => <SongListCard key={song.id} song={song} handleDeleteSong={handleDeleteSong} /> )}
    </div>
    </>
      )
}