import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./NavBar.css"
import { getAllSetLists } from "../../modules/SetListManager";

export const NavBar = ({ clearUser, isAuthenticated }) => {
    const navigate = useNavigate()

    const handleLogout = () => {
        clearUser();
        navigate('/');
    }

    return (
        <>
            <ul className="navbar">
                <li className="navbar__logo">
                    <img src="./images/logo.png" alt="get set logo" />
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
                {isAuthenticated
                    ? <li className="navbar__item">
                        <Link to="/" className="navbar__link" onClick={handleLogout}> Logout </Link>
                    </li>
                    : <li className="navbar__item">
                        <Link className="navbar__link" to="/login">Login</Link>
                    </li>}
            </ul>
        </>
    );
};