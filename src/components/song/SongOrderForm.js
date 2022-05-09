import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getSetListTracksByCurrentSetList } from "../../modules/SetListTracksManager";
import { updateSetListTrack } from "../../modules/SetListTracksManager";
import { useNavigate } from "react-router-dom";
import { getSetListTracksByCurrentSetListNoExpand } from "../../modules/SetListTracksManager";

export const SongOrderForm = () => {
  const [isloading, setIsLoading] = useState(true)
  const [setListTracks, setSetListTracks] = useState([])
  const {setListId} = useParams()
  const navigate = useNavigate()

  const handleListOrderChange = (evt) => {
    
    const updatedTrackArr = [...setListTracks]
    updatedTrackArr.find((trackItem, index) => {
      if (trackItem.id === parseInt(evt.target.id)) {
        trackItem.sequenceOrder = evt.target.value
        updatedTrackArr[index] = trackItem
        setSetListTracks(updatedTrackArr)
      }
      return null
  })
  }


  const handleSaveOrderClick = (evt) => {
      setIsLoading(true)

      const zeroCheck = setListTracks.find(setListTrack => parseInt(setListTrack.sequenceOrder) === 0)
      const emptyStringCheck = setListTracks.find(setListTrack => setListTrack.sequenceOrder === '')
      const lengthCheck = setListTracks.find(setListTrack => parseInt(setListTrack.sequenceOrder) > setListTracks.length)

      if (zeroCheck || emptyStringCheck) {
        window.alert("Please give all tracks a sequence number")
        setIsLoading(false)
      } else if (lengthCheck) {
        window.alert("Whoops check your numbering")
        setIsLoading(false)
      } else {
        setListTracks.forEach(setListTrack => {
          const updatedTrack = {
            setListId: setListTrack.setListId,
            songId: setListTrack.songId,
            id: setListTrack.id,
            sequenceOrder: parseInt(setListTrack.sequenceOrder)
      }
      updateSetListTrack(updatedTrack)
      .then(() => navigate('/'))
  
      })
    }
  }

  useEffect(() => {
    getSetListTracksByCurrentSetList(setListId)
    .then(allTracks => setSetListTracks(allTracks))
    setIsLoading(false)
  }, [])

  return (
    <>
    <div className="songOrderFormContainer">
    <form className="trackOrderForm">
      <h2 className="trackOrderForm__title">Choose Your Order</h2>
      <p className="trackTotal">You have {setListTracks.length} total tracks for sequence</p>
      {setListTracks.map(setListTrack => 
      <fieldset key={setListTrack.id}>
       <div className="form-group-songOrder">
         <label htmlFor="songOrderTrackName">{setListTrack.song?.name}</label>
         <input type="text" id={setListTrack.id} key={setListTrack.id} 
         onChange={handleListOrderChange} 
         required autoFocus className="form-control" placeholder="Track Order" value={setListTrack.sequenceOrder} />
       </div>
     </fieldset>
    )}
    </form>
    <button type="button" onClick={() => handleSaveOrderClick()}>Save Order</button>
    </div>
      </>
  )
}