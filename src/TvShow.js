import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function TvShow() {
  const [tvShows, setTvShows] = useState([]);
  const [savedShows, setSavedShows] = useState(() => {
    const saved = localStorage.getItem('savedShows');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    const fetchTvShows = async () => {
      const apiKey = process.env.REACT_APP_API_KEY;
      const url = `https://api.themoviedb.org/3/trending/tv/week?api_key=${apiKey}`;
      try {
        const res = await fetch(url);
        const data = await res.json();
        setTvShows(data.results);
      } catch (err) {
        console.error('Error Fetching TV Shows:', err);
      }
    };
    fetchTvShows();
  }, []);

  const toggleSaveShow = (showId) => {
    const isShowSaved = savedShows.includes(showId);
    const updatedSavedShows = isShowSaved
      ? savedShows.filter((id) => id !== showId)
      : [...savedShows, showId];

    setSavedShows(updatedSavedShows);
    localStorage.setItem('savedShows', JSON.stringify(updatedSavedShows));
  };

  const isSaved = (showId) => savedShows.includes(showId);

  const formatRating = (rating) => (rating ? rating.toFixed(1) : 'N/A');

  const formatDate = (dateForm) => {
    const date = new Date(dateForm);
    return date.getFullYear();
  };

  return (
    <div className="tv-list">
      {tvShows.length > 0 ? (
        tvShows.map((show) => (
          <div key={show.id} className="tv-item">
            <Link to={`/tv/${show.id}`} className="tv-item-link">
              <img
                src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                alt={show.name}
              />
            </Link>
            <div className="tv-info">
              <div className="tv-row">
                <p><i className="bi bi-star-fill"></i> {formatRating(show.vote_average)}</p>
                <p><i className="bi bi-calendar3-week-fill"></i> {formatDate(show.first_air_date)}</p>
              </div>
              <div className="tv-title">
                <h4>{show.name}</h4>
                <div className="bookmark-button">
                  <button onClick={(e) => {
                    e.stopPropagation(); // Prevent the Link from triggering
                    toggleSaveShow(show.id);
                  }} className="bookmark-btn">
                    {isSaved(show.id) ? (
                      <i className="bi bi-bookmark-fill"></i> 
                    ) : (
                      <i className="bi bi-bookmark"></i>
                    )}
                  </button>
                </div>
              </div>
              <div className="for-button">
                <Link to={`/tv/${show.id}`}>
                  <button><i className="bi bi-eye"></i> See more</button>
                </Link>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>Loading TV shows...</p>
      )}
    </div>
  );
}

export default TvShow;
