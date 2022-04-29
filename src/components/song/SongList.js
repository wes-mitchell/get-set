import React from "react";
import { useState, useEffect } from "react";
import { getAllSongs, getSongById } from "../../modules/SongsManager";
import { SongListCard } from "./SongListCard";
import { deleteSong } from "../../modules/SongsManager";
import { NoteCard } from "../notes/NoteCard";
import './SongList.css'

export const SongList = () => { 
  const [songs, setSongs] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const loggedInUser = JSON.parse(sessionStorage.getSet_user)
  const [song, setSong] = useState([])
  const [dialogVisible, setDialogVisible] = useState(false)

  // handles delete song gesture by deleting the song from the database

  const handleDeleteSong = id => {
    setIsLoading(true)
    deleteSong(id)
    .then(() => getAllSongs())
    .then(res => setSongs(res))
    setIsLoading(false)
  } 

  // handle note gesture from song list view

  const handleNoteClick = (song) => { 
    setIsLoading(true)
    getSongById(song.id)
    .then(song => setSong(song))
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
      <dialog className="dialog" id={''} open={dialogVisible}>
        <NoteCard song={song} />
        <button className="closeButton" onClick={() => {setDialogVisible(false)}}>Close</button>
      </dialog>
    <div className="songListContainer">
        {songs.map(song => song.userId === loggedInUser.id ? <SongListCard key={song.id} song={song} handleDeleteSong={handleDeleteSong} handleNoteClick={handleNoteClick} setDialogVisible={setDialogVisible} /> : '' )}
    </div>
    </>
      )
}