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
      if (trackItem.id === parseInt(evt.target.id) && parseInt(evt.target.value) !== NaN) {
        trackItem.listOrder = parseInt(evt.target.value)
        updatedTrackArr[index] = trackItem
        setSetListTracks(updatedTrackArr)
      }
      return null
    })
  }

  const handleSaveOrderClick = (evt) => {
      setIsLoading(true)
  
      setListTracks.forEach(setListTrack => {
        if (setListTrack.listOrder === 0 ) {
          window.alert("Please give all tracks a sequence number")
          setIsLoading(false)
        } else {
          setIsLoading(true)
          updateSetListTrack(setListTrack)
        }
      })
      navigate('/')
    }



  useEffect(() => {
    getSetListTracksByCurrentSetListNoExpand(setListId)
    .then(allTracks => setSetListTracks(allTracks))
    setIsLoading(false)
  }, [])

  return (
    <>
    <div className="songOrderFormContainer">
    <form className="trackOrderForm">
      <h2 className="trackOrderForm__title">Choose Your Order</h2>
      {setListTracks.map(setListTrack => 
      <fieldset key={setListTrack.id}>
       <div className="form-group-songOrder">
         <label htmlFor="songOrderTrackName">{setListTrack.song?.name}</label>
         <input type="text" id={setListTrack.id} key={setListTrack.id} 
         onChange={() => handleSaveOrderClick} 
         required autoFocus className="form-control" placeholder="Track Order" value={setListTrack.listOrder} />
       </div>
     </fieldset>
    )}
    </form>
    <button type="button" onClick={() => handleSaveOrderClick()}>Save Order</button>
    </div>
      </>
  )
}