import React, {useEffect} from 'react'
import './App.css'

function TopList({currentSection, onHandleChange}){
    const onHandleClick = (sec) => {
        if(onHandleChange){
            onHandleChange(sec)
        }else{
            console.error('onNavChange prop is not provided')
        }
    }
    
    return(
        <div className="list-tm">
            <nav className="list-tm-container">
                <a href="#movie" className={`mov-tv ${currentSection === "Movie" ? "active" : ''} `} onClick={() => onHandleClick('Movie')}><i class="bi bi-play-circle-fill"></i>Movie</a>
                <a href="#tvshow" className={`mov-tv ${currentSection === "TVShow" ? "active" : ''} `} onClick={() => onHandleClick('TVShow')}><i class="bi bi-tv-fill"></i>TV Show</a>
            </nav>
        </div>
    )
}

export default TopList;