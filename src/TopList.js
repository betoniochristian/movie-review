import React from 'react'
import { Link } from 'react-router-dom';

function TopList({ currentSection, onHandleChange }) {
    const onHandleClick = (sec) => {
        if (onHandleChange) {
            onHandleChange(sec);
        } else {
            console.error('onNavChange prop is not provided');
        }
    };

    return (
        <div className="list-tm">
            <nav className="list-tm-container">
                <Link to="#top-movie" className={`mov-tv ${currentSection === "Movie" ? "active" : ''}`} onClick={() => onHandleClick('Movie')}>
                    <i className="bi bi-play-circle-fill"></i>Movie
                </Link>
                <Link to="#top-tvshow" className={`mov-tv ${currentSection === "TVShow" ? "active" : ''}`} onClick={() => onHandleClick('TVShow')}>
                    <i className="bi bi-tv-fill"></i>TV Show
                </Link>
            </nav>
        </div>
    );
}

export default TopList;
