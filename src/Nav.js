import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './App.css';

function Nav({ onMenuToggle, onLinkClick }) {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate(); 

    const handleSearch = () => {
        if (searchTerm.trim()) {
            navigate(`/search?query=${encodeURIComponent(searchTerm)}`); 
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch(); 
        }
    };

    return (
        <div className="nav-container">
            <div className="icon-container">
                <img
                    className="icon-size"
                    src={`${process.env.PUBLIC_URL}/icon/movieIcon.png`}
                    alt="icon"
                />
                <p className="film-color">
                    <span className="f-color">FILM</span><br /><span className="r-color">RATING</span>
                </p>
            </div>
            <div className="menu-content">
                <div className="menu-item">
                    <button className="button-container" onClick={onMenuToggle}><i className="bi bi-list"></i></button>
                </div>
            </div>
            <div className="input-container">
                <input
                    className="inp-nav"
                    type="text"
                    placeholder='Search Movie'
                    id="input-nav"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={handleKeyPress} 
                />
                <span className="icon" onClick={handleSearch}><i className="bi bi-search"></i></span>
            </div>
        </div>
    );
}

export default Nav;
