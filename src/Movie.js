import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function Movie() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const url = `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.REACT_APP_API_KEY}`;
      try {
        const res = await fetch(url);
        const data = await res.json();
        setMovies(data.results);
      } catch (err) {
        console.error('Error Fetching Movies:', err);
      }
    };
    fetchMovies();
  }, []);

  const formatStar = (rating) => {
    return rating ? rating.toFixed(1) : 'N/A';
  };

  const formatDate = (dateForm) => {
    const date = new Date(dateForm);
    return date.getFullYear();
  };

  return (
    <div className="movie-list">
      {movies.length > 0 ? (
        movies.map((movie) => (
          <Link key={movie.id} to={`/movie/${movie.id}`} className="movie-item-link">
            <div className="movie-item">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <div className="info-movie">
                <div className="info-row">
                  <p><i className="bi bi-star-fill"></i> {formatStar(movie.vote_average)}</p>
                  <p><i className="bi bi-calendar3-week-fill"></i> {formatDate(movie.release_date)}</p>
                </div>
                <div className="mov-title">
                  <h4>{movie.title}</h4>
                </div>
                <div className="for-button">
                  <button className=""><i className="bi bi-eye"></i> See more</button>
                </div>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <p>Loading movies...</p>
      )}
    </div>
  );
}

export default Movie;
