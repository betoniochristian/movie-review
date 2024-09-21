import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function ComingSoonTv() {
  const [comingSoonMovies, setComingSoonMovies] = useState([]);
  const [savedTvShows, setSavedTvShows] = useState(() => {
    const saved = localStorage.getItem('savedTvShows');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    const apiKey = process.env.REACT_APP_API_KEY;

    const fetchComingSoonMovies = async () => {
      const movieUrl = `https://api.themoviedb.org/3/tv/airing_today?api_key=${apiKey}&language=en-US&page=1&region=US`;
      try {
        const res = await fetch(movieUrl);
        const data = await res.json();
        setComingSoonMovies(data.results);
      } catch (err) {
        console.error('Error Fetching Coming Soon TV Shows:', err);
      }
    };

    fetchComingSoonMovies();
  }, []);

  const toggleSaveMovie = (movieId) => {
    const isMovieSaved = savedTvShows.includes(movieId);
    const updatedSavedTvShows = isMovieSaved
      ? savedTvShows.filter((id) => id !== movieId)
      : [...savedTvShows, movieId];

    setSavedTvShows(updatedSavedTvShows);
    localStorage.setItem('savedTvShows', JSON.stringify(updatedSavedTvShows));
  };

  const isSaved = (movieId) => savedTvShows.includes(movieId);

  const formatStar = (rating) => (rating ? rating.toFixed(1) : 'N/A');

  const formatDate = (dateForm) => {
    const date = new Date(dateForm);
    return date.getFullYear();
  };

  return (
    <div className="movie-list1">
      {comingSoonMovies.length > 0 ? (
        comingSoonMovies.map((tvshow) => (
          <div key={tvshow.id} className="movie-item">
            <Link to={`/tv/${tvshow.id}`} className="movie-item-link">
              <img
                src={`https://image.tmdb.org/t/p/w500${tvshow.poster_path}`}
                alt={tvshow.name}
              />
            </Link>
            <div className="info-movie">
              <div className="info-row">
                <p><i className="bi bi-star-fill"></i> {formatStar(tvshow.vote_average)}</p>
                <p><i className="bi bi-calendar3-week-fill"></i> {formatDate(tvshow.first_air_date)}</p>
              </div>
              <div className="mov-title">
                <h4>{tvshow.name}</h4>
                <div className="bookmark-button">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSaveMovie(tvshow.id);
                    }}
                    className="bookmark-btn"
                  >
                    {isSaved(tvshow.id) ? (
                      <i className="bi bi-bookmark-fill"></i>
                    ) : (
                      <i className="bi bi-bookmark"></i>
                    )}
                  </button>
                </div>
              </div>
              <div className="for-button">
                <Link to={`/tv/${tvshow.id}`}>
                  <button className="">
                    <i className="bi bi-eye"></i> See more
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>Loading coming soon TV shows...</p>
      )}
    </div>
  );
}

export default ComingSoonTv;
