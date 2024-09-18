import React, { useState, useEffect } from 'react';
import TopTv from './TopTv'
import TopM from './TopM'
import TopList from './TopList'
import './App.css';

function TopMovie() {
  const [currentState, setCurrentState] = useState('Movie');

  const handleChange = (sec) => {
    setCurrentState(sec)
}
  return (
      <div className="list-movie">
        <div className="list-list-list">
            <div className="line1"></div>
            <span className="trending-title4">Top IMDB Rating</span>
            <div className="top-list">
                <TopList currentSection={currentState} onHandleChange={handleChange}/>
                {currentState === 'Movie' && <TopM />}
                {currentState === 'TVShow' && <TopTv />}
            </div>
        </div>
        

        
      </div>
    
  );
}

export default TopMovie;
