# Get Set
Get Set is a web app for musicians to generate and edit set lists on the fly. The idea comes from personal experience of having to make minor adjustments to very similar setlists night after night on a tour which wasted lots of paper and always ended up with a "clean setlist" covered in sharpie markings to denote where the small changes are. I've also included a "practice/performance" view in which a metronome is included for personal work at home or live situations utilizing in ear scenarios.

## Initial Setup
1. Clone this repository
2. Clone the [API](https://github.com/wes-mitchell/get-set-api)
3. Host the API using [json-server](https://github.com/typicode/json-server) on port 8088
4. Install dependencies with `npm install` in Get Set directory
5. Host the project using `npm start` in the project directory

## Navigating Get Set
Upon serving to correct hosts through your browser, you will be prompted to sign in or register as a new user. You may create a new account or sign in using any of the existing users accounts. 

A couple already existing user accounts are `john@bonham.com` & `jimi@hendrix.com`.

Upon login you will land in a view with all your previously saved setlists. If you created a new account, the page will be empty. Follow the "Add New Track" link in the navigation bar and create some new tracks to be added to a future setlist. Once you've created the desired tracks to be added to setlists follow the "Create New Setlist" link in the navigation bar. 

From this view you will:
- give your setlist a title
- add notes for that particular setlist i.e. "for Bonnaroo" or "Riot Fest Gig"
- check all songs you want to add to the setlist

Once save is clicked you will be re-directed to a view of all your saved setlists including your newly generated setlist. 

Once you've added some songs/tracks and setlists you may edit/delete them at any point by clicking on the correlating buttons. The only place to completely remove a song/track from your database is in the "See All Tracks" view. For "on the fly" purposes, deleting a song from the saved setlist view only removes it from that particular setlist. You may view notes about any particular track/song at any time by clicking on the corresponding button. 

If you select "practice" below it's corresponding setlist you will be redirected to a view with a metronome where you can work on particular items with all the info pulled up or use the metronome as an in ear setup for live performance.

### Entity Relationship Diagram
![Get Set ERD](/public/images/GetSetERD.PNG)

### Inititial Wireframe

Click [here](https://www.figma.com/file/jYYLF9w6FsAFmyi4ckjZPe/Get-Set?node-id=0%3A1) to see initial wireframe for project.

### Technologies
- HTML/CSS
- Javascript
- React
- JSON server
- ERD with drawSQL
- Wireframe generated with Figma
- Canva
- Postman

## Author Info
**Created by Wes Mitchell**

- LinkedIn - [Wesley Mitchell](https://www.linkedin.com/in/wesleymitchell87/)
- GitHub - [@wes-mitchell](https://github.com/wes-mitchell)
- WMDRUMS Website - [Tunes & Things](https://www.wmdrums.com/)

## Color Reference

| Color             | Hex                                                                |
| ----------------- | ------------------------------------------------------------------ |
| Black | ![#000000](https://color-hex.org/colors/000000.png) #000000 |
| Air Superiority Blue | ![#6ea4bf](https://color-hex.org/colors/6ea4bf.png) #6ea4bf |
| Black Coffee| ![#36303f](https://color-hex.org/colors/36303f.png) #36303f |
| White | ![#ffffff](https://color-hex.org/colors/ffffff.png) #ffffff |


