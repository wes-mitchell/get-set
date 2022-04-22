import React from "react"
import { Route, Routes, Outlet } from "react-router-dom"
import { Navigate } from "react-router-dom"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import { SetListList } from "./setlists/SetListList"
import { TrackCard } from "./track/TrackCard"
import { TrackForm } from "./track/TrackForm"



export const ApplicationViews = ({ isAuthenticated, setAuthUser }) => {

  const PrivateOutlet = () => {
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
  }

  //============== DON'T FORGET PRIVATE ROUTES!!! =======

  return (
      <>
        <Routes>

                {/* All Private Outlet Paths */}

        <Route path="/" element={<PrivateOutlet />} >

        {/* Render the set lists on user login when http://localhost:3000/ */}
        <Route path="/" element={<SetListList />} />


        {/* Render the create setlist form http://localhost:3000/setlist/create */}
        <Route path="/setlist/create" element={''} />

        {/* Render all user setlists on http://localhost:3000/setlist */}
        <Route path="/setlists" element={''} />

        {/* Render practice view at http://localhost:3000/setlist/practice*/}
        <Route path="/setlist/practice" element={''} />

        {/* Render edit set list view at http://localhost:3000/setlist/edit*/}
        <Route path="/setlist/edit" element={''} />

        {/* Render create track view at http://localhost:3000/track/create*/}
        <Route path="/track/create" element={<TrackForm /> } />

        </Route>

        {/* End of all Private Outlet Paths */}

        <Route path="/login" element={<Login setAuthUser={setAuthUser} />} />
        <Route path="/register" element={<Register setAuthUser={setAuthUser} />} />

        </Routes>       
      </>
  )
}