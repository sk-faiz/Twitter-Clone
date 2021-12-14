import React from 'react';
import "../Sidebar/Sidebar.css"

function Sidebar() {
    return (
        <div className="container">
            <div className="navigation-container">
                  <i className="fab fa-twitter"></i>
                  <i className="fas fa-home"></i>
                  <div className="profile"></div>
            </div>
        </div>
    )
}

export default Sidebar
