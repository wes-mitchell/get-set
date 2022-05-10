import React from "react";
import './Footer.css'

export const Footer = () => { 
  
  return (
    <>
    <div className="footer">
    <p className="copyrightText">&copy; 2022</p>
      <ul className="socialLinks">
        <li className="instgram">
          <a href="https://www.instagram.com/wmdrums/" target="_blank" >
            <img src="/images/instagram.png" alt="instagram logo" />
          </a>
        </li>
        <li className="youTube">
          <a href="https://www.youtube.com/wmdrums" target="_blank" >
            <img src="/images/youtube.png" alt="youtube logo" />
          </a>
          </li>
        <li className="squareSpace">
          <a href="https://www.wmdrums.com/" target="_blank" >
            <img src="/images/squarespace.png" alt="instagram logo" />
          </a>
        </li>
        <li className="github">
          <a href="https://github.com/wes-mitchell" target="_blank" >
            <img src="/images/github.png" alt="github logo" />
          </a>
        </li>
        <li className="linkedIn">
          <a href="https://www.linkedin.com/in/wesleymitchell87/" target="_blank" >
            <img src="/images/linkedin.png" alt="linked in logo" />
          </a>
        </li>

      </ul>
        <p className="name">Wesley Mitchell</p>
    </div>
    </>
  )
 }