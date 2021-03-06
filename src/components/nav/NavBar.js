import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./NavBar.css"
import { getAllSetLists } from "../../modules/SetListManager";
import { getAllSongs } from "../../modules/SongsManager";
import { SongList } from "../song/SongList";

export const NavBar = ({ clearUser, isAuthenticated }) => {
    const navigate = useNavigate()
    
    const cymbal = new Audio("/sounds/cymbal.mp3")

    const handleLogout = () => {
        clearUser();
        navigate('/');
    }

    return (
        <>
            <ul className="navbar">
                <li className="navbar__logo">
                    <img src={"/images/logo4.png"} alt="get set logo" onClick={() => cymbal.play()}/>
                </li>
                <li className="navbar__item">
                    <Link className="navbar__link" to="/" onClick={getAllSetLists}> My Setlists </Link>
                </li>
                {isAuthenticated && <li className="navbar__item">
                    <Link className="navbar__link" to="/setlist/create"> Create New Setlist </Link>
                </li>}
                <li className="navbar__item">
                    <Link className="navbar__link" to="/song/create"> Add New Track </Link>
                </li>
                <li className="navbar__item">
                    <Link className="navbar__link" to="/songs" onClick={getAllSongs}> See All Tracks </Link>
                </li>
                {isAuthenticated
                    ? <li className="navbar__item" id="navLogout">
                        <Link to="/" className="navbar__link" onClick={handleLogout}> Logout </Link>
                    </li>
                    : <li className="navbar__item" id="navLogin">
                        <Link className="navbar__link" to="/login">Login</Link>
                    </li>}
            </ul>
        </>
    );
};