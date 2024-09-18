import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function TvShow() {
  const [tvShows, setTvShows] = useState([]);

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

  const formatRating = (rating) => {
    return rating ? rating.toFixed(1) : 'N/A';
  };

  const formatDate = (dateForm) => {
    const date = new Date(dateForm);
    return date.getFullYear();
  };

  return (
    <div className="tv-list">
      {tvShows.length > 0 ? (
        tvShows.map((show) => (
          <Link key={show.id} to={`/tv/${show.id}`} className="tv-item-link">
            <div className="tv-item">
              <img
                src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                alt={show.name}
              />
              <div className="tv-info">
                <div className="tv-row">
                  <p><i className="bi bi-star-fill"></i> {formatRating(show.vote_average)}</p>
                  <p><i className="bi bi-calendar3-week-fill"></i> {formatDate(show.first_air_date)}</p>
                </div>
                <div className="tv-title">
                  <h4>{show.name}</h4>
                </div>
                <div className="for-button">
                  <button><i className="bi bi-eye"></i> See more</button>
                </div>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <p>Loading TV shows...</p>
      )}
    </div>
  );
}

export default TvShow;
