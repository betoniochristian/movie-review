import React, { useState, useEffect, useRef} from 'react';
import Trending from './Trending';
import ComingNav from './ComingNav';
import { useNavigate } from 'react-router-dom';
import './App.css';

function Home() {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const currentIndexRef = useRef(currentIndex);

  useEffect(() => {
    const fetchMovies = async () => {
      const apiKey = process.env.REACT_APP_API_KEY;
      const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`;

      try {
        const res = await fetch(url);
        const data = await res.json();
        const movieDetailsPromises = data.results.map(movie =>
          fetch(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=${apiKey}&language=en-US`)
            .then(res => res.json())
        );
        const moviesWithDetails = await Promise.all(movieDetailsPromises);
        setMovies(moviesWithDetails);
      } catch (err) {
        console.error('Error fetching movie data: ', err);
      }
    };
    fetchMovies();
  }, []);

  useEffect(() => {
    if (movies.length === 0) return;

    currentIndexRef.current = currentIndex;
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % movies.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [movies, ]);

  const formatTime = (minutes) => {
    if (minutes < 60){
        return `${minutes}m`
    }

    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60;
    return `${hours}h ${mins}m`
  }
  const formatRate = (rate) => {
    return rate.toFixed(1)
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length)
  }

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => prevIndex === 0 ? movies.length - 1 : prevIndex - 1 )
  }

  const handleClick = (id) => {
    navigate(`/movie/${id}`)
  }

  return (
    <div className="home-container">
      {movies.length > 0 ? (
        <div className="slideshow-container" id="forHome">
          {movies.map((movie, index) => (
            <div
              key={movie.id}
              className={`slide ${index === currentIndex ? 'active' : ''}`}
              onClick={() => handleClick(movie.id)} 
            >
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
              />
              <div className="movie-info">
                <h2>{movie.title}</h2>
                <p className="movie-details">
                  <span className="movie-runtime"><i class="bi bi-clock-fill"></i> {formatTime(movie.runtime)}</span>
                  <span className="movie-release"><i class="bi bi-calendar3-week-fill"></i> {new Date(movie.release_date).getFullYear()}</span>
                  <span className="movie-rating"><i class="bi bi-star-fill"></i> {formatRate(movie.vote_average)}</span>
                </p>
                <p className="movie-review">{movie.overview}</p>
              </div>
            </div>
          ))}
          <div className="navigation-buttons">
            <button onClick={handlePrev} className="prev-btn"><i class="bi bi-arrow-left"></i></button>
            <button onClick={handleNext} className="next-btn"><i class="bi bi-arrow-right"></i></button>
          </div>
        </div>
      ) : (
        <p>Loading movies...</p>
      )}

    <div className="trending-video">
      <Trending />
      <ComingNav />
    </div>

    </div>
  );
}

export default Home;
