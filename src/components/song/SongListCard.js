import { useNavigate } from "react-router-dom"

export const SongListCard = ({ song, handleDeleteSong }) => {
  const navigate = useNavigate()
  return (
    <>
      <div className="songListCard">
          <p className="trackName">{song.name}</p>
          <p className="trackBPM">{song.bpm} BPM</p>
      </div>
      <div className="trackButtons">
        <button type="button" className="trackNotes">Notes</button>
        <button type="button" className="trackEdit" onClick={() => navigate(`/song/${song.id}/edit`)}>Edit</button>
        <button type="button" className="trackDelete" onClick={() => handleDeleteSong(song.id)}>Delete</button>
      </div>
    </>
  )
}