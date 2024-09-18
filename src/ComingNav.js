import React, {useState} from 'react';
import ComingList from './ComingList'
import ComingSoon from './ComingSoon'
import ComingSoonTv from './ComingSoonTv'
import './App.css';



function ComingNav(){
    const [currentState, setCurrentState] = useState('Movie');

    const handleChange = (sec) => {
        setCurrentState(sec)
    }
    

    return(
        <div className="trending-container">

            <div className="trend">
                <div className="line"></div>
                <span className="trending-title">Coming Soon</span>
                <div className='list-list'>
                    <ComingList currentSection={currentState} onHandleChange={handleChange}/>
                    {currentState === 'Movie' && <ComingSoon />}
                    {currentState === 'TVShow' && <ComingSoonTv />}
                </div>
            </div>

            

            
        </div>
    )
}

export default ComingNav;