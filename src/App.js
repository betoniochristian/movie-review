// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Nav from './Nav';
import Home from './Home';
import MovieDetails from './MovieDetails'; 
import TvShowDetails from './TvShowDetails';
import ListMovie from './ListMovie';
import ListTv from './ListTv';
import TopMovie from './TopMovie';
import SearchResult from './SearchResult';
import Action from './Action';
import Drama from './Drama';
import Horror from './Horror';
import Adventure from './Adventure';
import History from './History';
import Science from './Science';
import Thriller from './Thriller';
import War from './War';
import './App.css';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClick = () => {
    if (isMenuOpen) {
      toggleMenu();
    }
  };

  return (
    <Router>
      <div className={`app ${isMenuOpen ? 'menu-open' : ''}`}>
        <Nav onMenuToggle={toggleMenu} onLinkClick={handleClick} />
        <div className={`menu ${isMenuOpen ? 'menu-open' : ''}`}>
          <button className="side-button" onClick={toggleMenu}>
            <i className="bi bi-arrow-left">Close Menu</i>
          </button>
          <ul>
            <Link className="a-hover" to="/" onClick={handleClick}>Home</Link>
            <Link className="a-hover" to="/movies" onClick={handleClick}>Movies</Link>
            <Link className="a-hover" to="/tv-shows" onClick={handleClick}>TV Shows</Link>
            <Link className="a-hover" to="/top-imdb" onClick={handleClick}>Top IMDB</Link>
          </ul>
          <p className="genre-real">Genre</p>
          <div className="genre-div">
            <Link className="genre-a" to="/action">Action</Link>
            <Link className="genre-a" to="/drama">Drama</Link>
            <Link className="genre-a" to="/horror">Horror</Link>
            <Link className="genre-a" to="/adventure">Adventure</Link>
            <Link className="genre-a" to="/history">History</Link>
            <Link className="genre-a" to="/science">Science Fiction</Link>
            <Link className="genre-a" to="/thriller">Thriller</Link>
            <Link className="genre-a" to="/war">War</Link>
          </div>  
        </div>

        <div className={`overlay ${isMenuOpen ? 'overlay-open' : ''}`} onClick={toggleMenu}></div>
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/action" element={<Action />} />
            <Route path="/drama" element={<Drama />} />
            <Route path="/horror" element={<Horror />} />
            <Route path="/adventure" element={<Adventure />} />
            <Route path="/history" element={<History />} />
            <Route path="/science" element={<Science />} />
            <Route path="/thriller" element={<Thriller />} />
            <Route path="/war" element={<War />} />
            <Route path="/movies" element={<ListMovie />} />
            <Route path="/tv-shows" element={<ListTv />} />
            <Route path="/top-imdb" element={<TopMovie />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/tv/:id" element={<TvShowDetails />} />
            <Route path="/search" element={<SearchResult />} />
            <Route path="*" element={<Home />} /> {/* Default route to Home */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
