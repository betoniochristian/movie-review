import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function WatchlistTv() {
  const [savedTvShows, setSavedTvShows] = useState(() => {
    const saved = localStorage.getItem('savedTvShows');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [tvShows, setTvShows] = useState([]);

  useEffect(() => {
    const fetchSavedTvShows = async () => {
      const fetchedTvShows = [];
      for (let id of savedTvShows) {
        const url = `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.REACT_APP_API_KEY}`;
        try {
          const res = await fetch(url);
          const data = await res.json();
          fetchedTvShows.push(data);
        } catch (err) {
          console.error('Error Fetching TV Show Details:', err);
        }
      }
      setTvShows(fetchedTvShows);
    };

    fetchSavedTvShows();
  }, [savedTvShows]);

  const toggleSaveTvShow = (tvShowId) => {
    const isTvShowSaved = savedTvShows.includes(tvShowId);
    const updatedSavedTvShows = isTvShowSaved
      ? savedTvShows.filter((id) => id !== tvShowId)
      : [...savedTvShows, tvShowId];

    setSavedTvShows(updatedSavedTvShows);
    localStorage.setItem('savedTvShows', JSON.stringify(updatedSavedTvShows));
  };

  const isSaved = (tvShowId) => savedTvShows.includes(tvShowId);

  const formatRating = (rate) => {
    return rate ? rate.toFixed(1) : 'N/A';
  };

  const formatDate = (date) => {
    const newDate = new Date(date);
    return newDate.getFullYear();
  };

  return (
    <div className="watchlist">
      <div className="list-movie9">
        <div className="line9"></div>
        <span className="trending-title9">Your Watchlist</span>
      </div>

      {tvShows.length > 0 ? (
        <div className="movie-list9">
          {tvShows.map((tvShow) => (
            <div key={tvShow.id} className="movie-item9">
              <Link to={`/tv/${tvShow.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`}
                  alt={tvShow.name}
                  className="movie-img"
                />
              </Link>
              <div className="info-movie9">
                <p><i className="bi bi-star-fill"></i> {formatRating(tvShow.vote_average)}</p>
                <p><i className="bi bi-calendar3-week-fill"></i> {formatDate(tvShow.first_air_date)}</p>
              </div>

              <div className="mov-title9">
                <h4>{tvShow.name}</h4>
                <div className="bookmark-button">
                  <button onClick={(e) => {
                    e.stopPropagation(); 
                    toggleSaveTvShow(tvShow.id);
                  }} className="bookmark-btn">
                    {isSaved(tvShow.id) ? (
                      <i className="bi bi-bookmark-fill"></i> 
                    ) : (
                      <i className="bi bi-bookmark"></i>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No TV shows saved in your watchlist.</p>
      )}
    </div>
  );
}

export default WatchlistTv;
