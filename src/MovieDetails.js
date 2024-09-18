import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './App.css';

function MovieDetail() {
  const { id } = useParams(); 
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const [similarMovies, setSimilarMovies] = useState([]);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}`;

      try {
        const res = await fetch(url);
        const data = await res.json();
        setMovie(data);
      } catch (err) {
        console.error('Error Fetching Movie Details:', err);
      }
    };

    const fetchMovieCredits = async () => {
        const url = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}`;
  
        try {
          const res = await fetch(url);
          const data = await res.json();
          setCredits(data);
        } catch (err) {
          console.error('Error Fetching Movie Credits:', err);
        }
      };

    const fetchMovieTrailer = async () =>{
        const url = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}`;

        try{    
            const res = await fetch(url);
            const data = await res.json();
            const newTrailer = data.results.find(video => video.type === "Trailer")
            setTrailer(newTrailer?.key);
        }catch(err){
            console.error('Error Fetching Movie Trailer', err)
        }
    }  

    const fetchSimilarMovies = async () => {
      const url = `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${process.env.REACT_APP_API_KEY}`;


      try{    
        const res = await fetch(url);
        const data = await res.json();
        setSimilarMovies(data.results);
    }catch(err){
        console.error('Error Fetching Movie Trailer', err)
    }
    }


        fetchMovieTrailer();  
        fetchMovieDetail();
        fetchMovieCredits();
        fetchSimilarMovies();
  }, [id]);

  if (!movie || !credits) {
    return <p>Loading movie details...</p>;
  }

  const formatTime = (time) => {
    if(time < 60){
        return `${time}m`
    }
    
    const hour = Math.floor(time / 60);
    const minutes = time % 60;
    return `${hour}h ${minutes}m`;
  }

  const formatRate = (rate) => {
    return rate.toFixed(1)
  }

  const handleOpenTrailer = () =>{
    setIsTrailerOpen(true)
  }

  const handleCloseTrailer = () =>{
    setIsTrailerOpen(false)
  }

  return (
    <div className="movie-detail" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` }}>
                <div className="overlaying">
                
                    <div className="over-img">
                        <img
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                        />
                        
                        <div className="over-content">
                            <div className="over-details">
                                <h2>{movie.title}</h2>
                            </div>

                            <div className="over-titles">
                                <p><i className="bi bi-calendar3-week-fill"></i> {new Date(movie.release_date).toLocaleDateString()}</p>
                                <p><i className="bi bi-star-fill"></i> {formatRate(movie.vote_average)}</p>
                                <p><i className="bi bi-clock-fill"></i> {formatTime(movie.runtime)}</p>
                            </div>
                            <div className="over-overview">
                                <p>{movie.overview}</p>
                            </div>

                            <div className="genre">
                                <span className="genre-first production"><span className="category">Genre:</span>{movie.genres.map((genre) => genre.name ).join(',')}</span>
                                <span className="genre-first production"><span className="category">Production:</span>{movie.production_companies.map((productions) => productions.name)}</span>
                            </div>

                            <div className="genre-2">
                                <span className="genre-second production"><span className="category">Cast:</span>{credits.cast.slice(0, 5).map((actor) => actor.name).join(', ')}</span> 
                                <span className="genre-second production"><span className="category">Country:</span>{movie.production_countries.map((country) => country.name).join(', ')}</span>
                            </div>

                            <button className="trailer-button" onClick={handleOpenTrailer}>Watch Trailer</button>
                            {isTrailerOpen && (
                            <div className="trailer-popup">
                                <div className="trailer-popup-overlay" onClick={handleCloseTrailer}></div>
                                <div className="trailer-popup-content">
                                <button className="close-button" onClick={handleCloseTrailer}><i class="bi bi-x-circle-fill"></i></button>
                                {trailer ? (
                                    <iframe
                                    width="100%"
                                    height="315"
                                    src={`https://www.youtube.com/embed/${trailer}`}
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    ></iframe>
                                ) : (
                                    <p>Trailer not available</p>
                                )}
                                </div>
                            </div>
                            )}
                        </div>
                    </div>
                </div>
                            
                    <div className="movie-details-similar-title">
                            <div className="line1"></div>
                            <span className="trending-title1">You may also like</span>
                    </div>
                <div className='similar-like'>
                    <div className="movie-list2">
                          {similarMovies.length > 0 ? (
                            similarMovies.map((movie) => (
                              <Link key={movie.id} to={`/movie/${movie.id}`} className="movie-item-link2">
                                <div className="movie-item2">
                                  <img
                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                    alt={movie.title}
                                  />
                                  <div className="info-movie2">
                                    <div className="info-row2">
                                      <p><i className="bi bi-star-fill"></i> {formatRate(movie.vote_average)}</p>
                                      <p><i className="bi bi-calendar3-week-fill"></i> {new Date(movie.release_date).toLocaleDateString()}</p>
                                    </div>
                                    <div className="mov-title2">
                                      <h4>{movie.title}</h4>
                                    </div>
                                    <div className="for-button2">
                                      <button className=""><i className="bi bi-eye"></i> See more</button>
                                    </div>
                                  </div>
                                </div>
                              </Link>
                            ))
                                    ) : (
                        <p>Loading similar movies...</p>
                      )}
                    </div>

      </div>

    </div>
  );
}

export default MovieDetail;
