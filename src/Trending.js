import React, {useState} from 'react';
import List from './List'
import Movie from './Movie'
import TvShow from './TvShow'
import './App.css';



function Trending(){
    const [currentState, setCurrentState] = useState('Movie');

    const handleChange = (sec) => {
        setCurrentState(sec)
    }
    

    return(
        <div className="trending-container">

            <div className="details">
                <p className="about">This website serves as a comprehensive guide for movie enthusiasts, offering not only ratings but also detailed information about each film. Here, you can find in-depth descriptions of the plot, cast, genre, and director, along with critical and audience reviews that provide a well-rounded view of the movie's reception. Whether you're interested in the latest releases, classic films, or hidden gems, this platform helps you make informed choices by giving you a clear understanding of each movie's quality, appeal, and relevance. It’s your go-to source for everything you need to know before watching a film.</p>
            </div>

            <div className="trend">
                <div className="line"></div>
                <span className="trending-title">Trending</span>
                <div className='list-list'>
                    <List currentSection={currentState} onHandleChange={handleChange}/>
                    {currentState === 'Movie' && <Movie />}
                    {currentState === 'TVShow' && <TvShow />}
                </div>
            </div>

            

            
        </div>
    )
}

export default Trending;