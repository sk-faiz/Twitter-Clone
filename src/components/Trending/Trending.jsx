import React from 'react';
import "../Trending/Trending.css"

function Trending() {
    return (
        <div className="twitter-sidebar-container">
            <div className="trending">
                 <p className="trending-title">What’s happening</p>
                 <ul id="tren">
                     <li id="trend">#VeChain</li>
                     <li id="trend">#Binance</li>
                     <li id="trend">#Bitcoin</li>
                 </ul>
            </div> 
        </div>
    )
}

export default Trending
