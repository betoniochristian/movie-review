import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Watchlist() {
  const [savedMovies, setSavedMovies] = useState(() => {
    const saved = localStorage.getItem('savedMovies');
    return saved ? JSON.parse(saved) : [];
  });

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchSavedMovies = async () => {
      const fetchedMovies = [];
      for (let id of savedMovies) {
        const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}`;
        try {
          const res = await fetch(url);
          const data = await res.json();
          fetchedMovies.push(data);
        } catch (err) {
          console.error('Error Fetching Movie Details:', err);
        }
      }
      setMovies(fetchedMovies);
    };

    if (savedMovies.length > 0) {
      fetchSavedMovies();
    }
  }, [savedMovies]);

  const toggleSaveMovie = (movieId) => {
    const updatedSavedMovies = savedMovies.includes(movieId)
      ? savedMovies.filter((id) => id !== movieId)
      : [...savedMovies, movieId];

    setSavedMovies(updatedSavedMovies);
    localStorage.setItem('savedMovies', JSON.stringify(updatedSavedMovies));
  };

  const formatRating = (rate) => (rate ? rate.toFixed(1) : 'N/A');

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

      {movies.length > 0 ? (
        <div className="movie-list9">
          {movies.map((movie) => (
            <div key={movie.id} className="movie-item9">
              <Link to={`/movie/${movie.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="movie-img"
                />
              </Link>
              <div className="info-movie9">
                <p><i className="bi bi-star-fill"></i> {formatRating(movie.vote_average)}</p>
                <p><i className="bi bi-calendar3-week-fill"></i> {formatDate(movie.release_date)}</p>
              </div>

              <div className="mov-title9">
                <h4>{movie.title}</h4>
                <div className="bookmark-button">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSaveMovie(movie.id);
                    }}
                    className="bookmark-btn"
                  >
                    {savedMovies.includes(movie.id) ? (
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
        <p>No movies saved in your watchlist.</p>
      )}
    </div>
  );
}

export default Watchlist;
