import React from 'react';
import "../Search/Search.css";


function Search(props) {
    
    return (
        <div>
            <div className="search">
                <input id="search" type="text" placeholder="Search Tweets" autoComplete="off" onKeyUp={props.enter}/>
                <i className="fas fa-search" onClick={props.data}></i>
            </div>
        </div>
    )
}

export default Search
