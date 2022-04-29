import { useNavigate } from "react-router-dom"

export const SongListCard = ({ song, handleDeleteSong, handleNoteClick, setDialogVisible }) => {
  const navigate = useNavigate()
  return (
    <>
      <div className="songListCard">
          <p className="songListTrackName">{song.name}</p>
          <p className="songListTrackBPM">{song.bpm} BPM</p>
      </div>
      <div className="trackButtons">
        <button type="button" className="trackNotes" onClick={() => (handleNoteClick(song),setDialogVisible(true))}>Notes</button>
        <button type="button" className="trackEdit" onClick={() => navigate(`/song/${song.id}/edit`)}>Edit</button>
        <button type="button" className="trackDelete" onClick={() => handleDeleteSong(song.id)}>Delete</button>
      </div>
    </>
  )
}