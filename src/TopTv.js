import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

const API_KEY = process.env.REACT_APP_API_KEY;
const API_URL = 'https://api.themoviedb.org/3/tv/top_rated';

function TopTv() {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

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
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <i class="bi bi-chevron-left"></i>
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
          <i class="bi bi-chevron-right"></i>
        </button>
      </div>
    );
  };

  return (
    <div className="top-movie-list" id="top-tvshow">
      {renderPagination()}
    <div className="movie-list3">
      {movies.length > 0 ? (
        <>
          {movies.map((movie) => (
            <Link key={movie.id} to={`/tv/${movie.id}`} className="movie-item-link3">
              <div className="movie-item3">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.name}
                />
                <div className="info-movie3">
                  <div className="info-row3">
                    <p><i className="bi bi-star-fill"></i> {formatStar(movie.vote_average)}</p>
                    <p><i className="bi bi-calendar3-week-fill"></i> {formatDate(movie.release_date)}</p>
                  </div>
                  <div className="mov-title3">
                    <h4>{movie.name}</h4>
                  </div>
                  <div className="for-button3">
                    <button><i className="bi bi-eye"></i> See more</button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </>
      ) : (
        <p>Loading movies...</p>
      )}
    </div>

    {renderPagination()}
    </div>
  );
}

export default TopTv;
