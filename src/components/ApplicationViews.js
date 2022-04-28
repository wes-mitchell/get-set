import React from "react"
import { Route, Routes, Outlet } from "react-router-dom"
import { Navigate } from "react-router-dom"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import { SetListList } from "./setlists/SetListList"
import { SetListForm } from "./setlists/SetListForm"
import { SetListEditForm } from "./setlists/SetListEditForm"
import { SongForm } from "./song/SongForm"
import { SongEditForm } from "./song/SongEditForm"
import { SetListPracticeView } from "./setlists/SetListPracticeView"
import { SongList } from "./song/SongList"




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

        {/* Render all user set lists on login when http://localhost:3000/ */}
        <Route path="/" element={<SetListList />} />


        {/* Render the create setlist form http://localhost:3000/setlist/create */}
        <Route path="/setlist/create" element={<SetListForm /> } />


        {/* Render edit set list view at http://localhost:3000/setlist/edit*/}
        <Route path="/setlist/:setListId/edit" element={<SetListEditForm />} />


        {/* Render practice view at http://localhost:3000/setlist/practice*/}
        <Route path="/setlist/:setListId/practice" element={<SetListPracticeView />} />

        {/* Render create track view at http://localhost:3000/song/create*/}
        <Route path="/song/create" element={<SongForm /> } />
        <Route path="/song/:songId/edit" element={<SongEditForm />} />
        <Route path="/songs" element={<SongList />} />

        </Route>

        {/* End of all Private Outlet Paths */}

        <Route path="/login" element={<Login setAuthUser={setAuthUser} />} />
        <Route path="/register" element={<Register setAuthUser={setAuthUser} />} />

        </Routes>       
      </>
  )
}