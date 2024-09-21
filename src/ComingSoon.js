import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function ComingSoon() {
  const [comingSoonMovies, setComingSoonMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState(() => {
    const saved = localStorage.getItem('savedMovies');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    const apiKey = process.env.REACT_APP_API_KEY;

    const fetchComingSoonMovies = async () => {
      const movieUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=1&region=US`;
      try {
        const res = await fetch(movieUrl);
        const data = await res.json();
        setComingSoonMovies(data.results);
      } catch (err) {
        console.error('Error Fetching Coming Soon Movies:', err);
      }
    };

    fetchComingSoonMovies();
  }, []);

  const toggleSaveMovie = (movieId) => {
    const isMovieSaved = savedMovies.includes(movieId);
    const updatedSavedMovies = isMovieSaved
      ? savedMovies.filter((id) => id !== movieId)
      : [...savedMovies, movieId];

    setSavedMovies(updatedSavedMovies);
    localStorage.setItem('savedMovies', JSON.stringify(updatedSavedMovies));
  };

  const isSaved = (movieId) => savedMovies.includes(movieId);

  const formatStar = (rating) => (rating ? rating.toFixed(1) : 'N/A');

  const formatDate = (dateForm) => {
    const date = new Date(dateForm);
    return date.getFullYear();
  };

  return (
    <div className="movie-list1">
      {comingSoonMovies.length > 0 ? (
        comingSoonMovies.map((movie) => (
          <div key={movie.id} className="movie-item">
            <Link to={`/movie/${movie.id}`} className="movie-item-link">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
            </Link>
            <div className="info-movie">
              <div className="info-row">
                <p><i className="bi bi-star-fill"></i> {formatStar(movie.vote_average)}</p>
                <p><i className="bi bi-calendar3-week-fill"></i> {formatDate(movie.release_date)}</p>
              </div>
              <div className="mov-title">
                <h4>{movie.title}</h4>
                <div className="bookmark-button">
                  <button onClick={(event) => { event.stopPropagation(); toggleSaveMovie(movie.id); }} className="bookmark-btn">
                    {isSaved(movie.id) ? (
                      <i className="bi bi-bookmark-fill"></i> 
                    ) : (
                      <i className="bi bi-bookmark"></i>
                    )}
                  </button>
                </div>
              </div>
              <div className="for-button">
                <Link to={`/movie/${movie.id}`}>
                  <button className=""><i className="bi bi-eye"></i> See more</button>
                </Link>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>Loading coming soon movies...</p>
      )}
    </div>
  );
}

export default ComingSoon;
