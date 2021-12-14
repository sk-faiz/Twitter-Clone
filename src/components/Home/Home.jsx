import React from 'react';
import '../Home/Home.css';
import Post from '../Post/Post';
import Sidebar from '../Sidebar/Sidebar';
import Trending from '../Trending/Trending';

export default function home() {
    return (
        <>
            <div className="container home-page">
                <Sidebar/>
                <div className="main">
                     <div className="post-main">
                         <Post/>
                     </div>
                </div>
                <Trending/>
            </div>
        </>
    )
}
