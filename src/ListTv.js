import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

const API_KEY = process.env.REACT_APP_API_KEY;
const API_URL = 'https://api.themoviedb.org/3/trending/tv/week';

function ListTv() {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [savedTvShows, setSavedTvShows] = useState(() => {
    const saved = localStorage.getItem('savedTvShows');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    const fetchMovies = async () => {
      const url = `${API_URL}?api_key=${API_KEY}&page=${currentPage}`;
      try {
        const res = await fetch(url);
        const data = await res.json();
        setMovies(data.results);
        setTotalPages(data.total_pages);
      } catch (err) {
        console.error('Error Fetching Movies:', err);
      }
    };
    fetchMovies();
  }, [currentPage]);

  const toggleSaveMovie = (movieId) => {
    const isMovieSaved = savedTvShows.includes(movieId);
    const updatedSavedTvShows = isMovieSaved
      ? savedTvShows.filter((id) => id !== movieId)
      : [...savedTvShows, movieId];

    setSavedTvShows(updatedSavedTvShows);
    localStorage.setItem('savedTvShows', JSON.stringify(updatedSavedTvShows));
  };

  const isSaved = (movieId) => savedTvShows.includes(movieId);

  const formatStar = (rating) => {
    return rating ? rating.toFixed(1) : 'N/A';
  };

  const formatDate = (dateForm) => {
    const date = new Date(dateForm);
    return date.getFullYear();
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const renderPagination = () => {
    const maxPagesToShow = 5;
    const halfRange = Math.floor(maxPagesToShow / 2);
    let startPage = Math.max(1, currentPage - halfRange);
    let endPage = Math.min(totalPages, currentPage + halfRange);

    if (endPage - startPage + 1 < maxPagesToShow) {
      if (startPage === 1) {
        endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
      } else {
        startPage = Math.max(1, endPage - maxPagesToShow + 1);
      }
    }

    return (
      <div className="pagination2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <i className="bi bi-chevron-left"></i>
        </button>

        {Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index).map(page => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={page === currentPage ? 'active' : ''}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <i className="bi bi-chevron-right"></i>
        </button>
      </div>
    );
  };

  return (
    <div className="">
      <div className="list-movie">
        <div className="line1"></div>
        <span className="trending-title4">Popular TV Show</span>
      </div>
      {renderPagination()}
      <div className="movie-list4">
        {movies.length > 0 ? (
          <>
            {movies.map((movie) => (
              <div key={movie.id} className="movie-item4">
                {/* Link wrapping only the image */}
                <Link to={`/tv/${movie.id}`} className="movie-item-link4">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.name}
                  />
                </Link>

                <div className="info-movie4">
                  <div className="info-row4">
                    <p><i className="bi bi-star-fill"></i> {formatStar(movie.vote_average)}</p>
                    <p><i className="bi bi-calendar3-week-fill"></i> {formatDate(movie.first_air_date)}</p>
                  </div>

                  <div className="mov-title4">
                    <h4>{movie.name}</h4>

                    <div className="bookmark-button">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSaveMovie(movie.id);
                        }}
                        className="bookmark-btn"
                      >
                        {isSaved(movie.id) ? (
                          <i className="bi bi-bookmark-fill"></i>
                        ) : (
                          <i className="bi bi-bookmark"></i>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Link wrapping only the See more button */}
                  <div className="for-button4">
                    <Link to={`/tv/${movie.id}`}>
                      <button>
                        <i className="bi bi-eye"></i> See more
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <p>Loading TV shows...</p>
        )}
      </div>

      {renderPagination()}
    </div>
  );
}

export default ListTv;
