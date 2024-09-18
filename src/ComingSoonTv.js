import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function ComingSoonTv() {
  const [comingSoonMovies, setComingSoonMovies] = useState([]);

  useEffect(() => {
    const apiKey = process.env.REACT_APP_API_KEY;

    const fetchComingSoonMovies = async () => {
        const movieUrl = `https://api.themoviedb.org/3/tv/airing_today?api_key=${apiKey}&language=en-US&page=1&region=US
`;
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

  const formatStar = (rating) => {
    return rating ? rating.toFixed(1) : 'N/A';
  };

  const formatDate = (dateForm) => {
    const date = new Date(dateForm);
    return date.getFullYear();
  };

  return (
    <div className="movie-list1">
        {comingSoonMovies.length > 0 ? (
          comingSoonMovies.map((tvshow) => (
            <Link key={tvshow.id} to={`/tv/${tvshow.id}`} className="movie-item-link">
              <div className="movie-item">
                <img
                  src={`https://image.tmdb.org/t/p/w500${tvshow.poster_path}`}
                  alt={tvshow.name}
                />
                <div className="info-movie">
                  <div className="info-row">
                    <p><i className="bi bi-star-fill"></i> {formatStar(tvshow.vote_average)}</p>
                    <p><i className="bi bi-calendar3-week-fill"></i> {formatDate(tvshow.release_date)}</p>
                  </div>
                  <div className="mov-title">
                    <h4>{tvshow.name}</h4>
                  </div>
                  <div className="for-button">
                    <button className=""><i className="bi bi-eye"></i> See more</button>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p>Loading coming soon movies...</p>
        )}

     
    </div>
  );
}

export default ComingSoonTv;
