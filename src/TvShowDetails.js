import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './App.css';

function TvShowDetails() {
  const { id } = useParams();
  const [tvShow, setTvShow] = useState(null);
  const [credits, setCredits] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const [similarShows, setSimilarShows] = useState([]);

  useEffect(() => {
    // Reset the state when ID changes
    setTvShow(null);
    setCredits(null);
    setTrailer(null);
    setSimilarShows([]);
  
    const apiKey = process.env.REACT_APP_API_KEY;
  
    const fetchTvShowDetails = async () => {
      const url = `https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}&language=en-US`;
  
      try {
        const res = await fetch(url);
        const data = await res.json();
        setTvShow(data);
      } catch (err) {
        console.error('Error Fetching TV Show Details:', err);
      }
    };
  
    const fetchTvShowCredits = async () => {
      const url = `https://api.themoviedb.org/3/tv/${id}/credits?api_key=${apiKey}&language=en-US`;
  
      try {
        const res = await fetch(url);
        const data = await res.json();
        setCredits(data);
      } catch (err) {
        console.error('Error Fetching TV Show Credits:', err);
      }
    };
  
    const fetchTvShowTrailer = async () => {
      const url = `https://api.themoviedb.org/3/tv/${id}/videos?api_key=${apiKey}&language=en-US`;
  
      try {
        const res = await fetch(url);
        const data = await res.json();
        const newTrailer = data.results.find(video => video.type === "Trailer");
        setTrailer(newTrailer?.key);
      } catch (err) {
        console.error('Error Fetching TV Show Trailer', err);
      }
    };
  
    const fetchSimilarShows = async () => {
      const url = `https://api.themoviedb.org/3/tv/${id}/similar?api_key=${apiKey}&language=en-US`;
  
      try {
        const res = await fetch(url);
        const data = await res.json();
        setSimilarShows(data.results);
      } catch (err) {
        console.error('Error Fetching Similar TV Shows', err);
      }
    };
  
    fetchTvShowDetails();
    fetchTvShowCredits();
    fetchTvShowTrailer();
    fetchSimilarShows();
  }, [id]);

  if (!tvShow || !credits) {
    return <p>Loading TV show details...</p>;
  }

  // Add conditional check to avoid undefined vote_average
  const formatRate = (rate) => {
    return rate ? rate.toFixed(1) : 'N/A';
  };

  const handleOpenTrailer = () => {
    setIsTrailerOpen(true);
  };

  const handleCloseTrailer = () => {
    setIsTrailerOpen(false);
  };

  return (
    <div className="tv-show-detail" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${tvShow.backdrop_path})` }}>
      <div className="overlaying">
        <div className="over-img">
          <img
            src={`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`}
            alt={tvShow.name}
          />
          <div className="over-content">
            <div className="over-details">
              <h2>{tvShow.name || 'No Title Available'}</h2>
            </div>

            <div className="over-titles">
              <p><i className="bi bi-calendar3-week-fill"></i> {new Date(tvShow.first_air_date).toLocaleDateString()}</p>
              <p><i className="bi bi-star-fill"></i> {formatRate(tvShow.vote_average)}</p>
            </div>
            <div className="over-overview">
              <p>{tvShow.overview || 'No overview available.'}</p>
            </div>

            <div className="genre">
              <span className="genre-first production"><span className="category">Genre:</span>{tvShow.genres?.map((genre) => genre.name).join(', ') || 'No genres available'}</span>
              <span className="genre-second production"><span className="category">Country:</span>{tvShow.production_countries?.map((country) => country.name).join(', ') || 'No country info available'}</span>
            </div>

            <div className="genre-2">
              <span className="genre-second production"><span className="category">Cast:</span>{credits?.cast?.slice(0, 5).map((actor) => actor.name).join(', ') || 'No cast information available'}</span> 
            </div>

            {/* Trailer Button */}
            <button className="trailer-button" onClick={handleOpenTrailer}>Watch Trailer</button>

            {/* Trailer Popup */}
            {isTrailerOpen && (
              <div className="trailer-popup">
                <div className="trailer-popup-overlay" onClick={handleCloseTrailer}></div>
                <div className="trailer-popup-content">
                  <button className="close-button" onClick={handleCloseTrailer}><i className="bi bi-x-circle-fill"></i></button>
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

      <div className="movie-details-similar-title1">
        <div className="line1"></div>
        <span className="trending-title1">You may also like</span>
      </div>
      
      <div className='similar-like'>
  <div className="movie-list5">
    {similarShows.length > 0 ? (
      similarShows.map((tvShow) => (
        <Link key={tvShow.id} to={`/tv/${tvShow.id}`} className="movie-item-link2">
          <div className="movie-item2">
            <img
              src={tvShow.poster_path ? `https://image.tmdb.org/t/p/w500${tvShow.poster_path}` : '/placeholder-image.jpg'}
              alt={tvShow.name || 'No Title Available'}
            />
            <div className="info-movie2">
              <div className="info-row2">
                {/* Handle missing rating or date data */}
                <p><i className="bi bi-star-fill"></i> {tvShow.vote_average ? formatRate(tvShow.vote_average) : 'N/A'}</p>
                <p><i className="bi bi-calendar3-week-fill"></i> {tvShow.first_air_date ? new Date(tvShow.first_air_date).toLocaleDateString() : 'Unknown'}</p>
              </div>
              <div className="mov-title2">
                <h4>{tvShow.name || 'No Title Available'}</h4>
              </div>
              <div className="for-button2">
                <button>
                  <i className="bi bi-eye"></i> See more
                </button>
              </div>
            </div>
          </div>
        </Link>
      ))
    ) : (
      <p>Loading similar TV shows...</p>
    )}
  </div>
</div>



    </div>
  );
}

export default TvShowDetails;
