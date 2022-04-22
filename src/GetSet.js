import React from "react"
import { useState } from "react"
import { NavBar } from "./components/nav/NavBar"
import { ApplicationViews } from "./components/ApplicationViews"

export const GetSet = () =>  {
    const [isAuthenticated, setIsAuthenticated] = useState(sessionStorage.getItem("getSet_user") !== null)

    const setAuthUser = (user) => {
        sessionStorage.setItem("getSet_user", JSON.stringify(user))
        setIsAuthenticated(sessionStorage.getItem("getSet_user") !== null)
    }

    const clearUser = () => {
        sessionStorage.clear();
        setIsAuthenticated(sessionStorage.getItem("getSet_user") !== null)
      }
    
      return (
        <>
            <NavBar clearUser={clearUser} isAuthenticated={isAuthenticated}/>
            <ApplicationViews 
                setAuthUser={setAuthUser}
                isAuthenticated={isAuthenticated}
                setIsAuthenticated={setIsAuthenticated}
            />
        </>
    )
}


