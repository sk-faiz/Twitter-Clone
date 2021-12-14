import React from 'react';
import "../Post/Post.css";
import axios from "axios"
import Search from '../Search/Search';
import moment from 'moment';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loader from '../Loader/Loader';

const enterKey = (e) => {
    if (e.key === "Enter") {
        fetchData();
    }
}

let count = 10;
const URL = "http://localhost:5000/tweets";
let nextPageURl = null;

const NextData = (metadata) => {
    if (metadata.next_results) {
        nextPageURl = `${URL}${metadata.next_results}`
    } else {
        nextPageURl = null;
    }
}

const OnNextPage = () => {
    if (nextPageURl) {
        fetchData(true)
    }
}

const fetchData = (nextPage=false) => {
    const inputValue = document.getElementById("search").value;
    if (!inputValue) return;
    const encoded = encodeURIComponent(inputValue);
    console.log(inputValue)
    let full_url = `${URL}?q=${encoded}&count=${count}`;
    if (nextPage && nextPageURl) {
        full_url = nextPageURl;
    }
    return axios.get(full_url)
     .then((response) => {
         buildTweet(response.data.statuses, nextPage);
         NextData(response.data.search_metadata);
        });
}


const buildImg = (mediaImages) => {
    let imageContent = '<div class="user-img">';
    let imgExist = false;
    mediaImages.map((media) => {
       if (media.type === "photo") {
           imgExist = true;
           imageContent += `<div class="tweet-img" style="background-image: url(${media.media_url_https})"></div>`
       }
    });
    imageContent += `</div>`;
    return imgExist ? imageContent : '';
}

const buildVideo = (mediaVideo) => {
    let videoContent = '<div class="user-video">';
    let videoExist = false;
    mediaVideo.map((media) => {
       if (media.type === "video") {
           videoExist = true;
           videoContent += `<div class="tweet-video"><video width="100%" height="40%" controls ><source src="${media.video_info.variants[0].url}" type="video/mp4"></video></div>`
       } else if( media.type === "animated_gif") {
        videoExist = true;
        videoContent += `<div class="tweet-video"><video width="60%" height="40%" loop autoplay><source src="${media.video_info.variants[0].url}" type="video/mp4"></video></div>`
       }
    });
    videoContent += `</div>`;
    return videoExist ? videoContent : '';
}

const buildTweet = (tweets, nextPage) => {
    let twitterpost = "";
    tweets.map((data) => {
        twitterpost += `
        <div id="post-main">
                <div class="post-1">
                <div class="user-profile">             
                    <div class="handle">
                        <div class="user-prof"><img src="${data.user.profile_image_url_https}"></div>
                        <div class="user-name">${data.user.name}</div>
                        <div class="user-handle">@${data.user.screen_name}</div>
                    </div>
                </div>`
        twitterpost += `        
                <div class="user-text">
                ${data.full_text}
                </div>
                `
                if(data.extended_entities && data.extended_entities.media.length > 0) {
                    twitterpost += buildImg(data.extended_entities.media);
                    twitterpost += buildVideo(data.extended_entities.media);
                }
        twitterpost += ` 
            <div class="user-date">${moment(data.created_at).fromNow()}</div>       
            </div>
            </div>
        `
    })
    if (nextPage) {
        document.getElementById('post-main').insertAdjacentHTML('beforeend', twitterpost);
    } else {
        document.getElementById('post-main').innerHTML = twitterpost;
    }
    
}


function Post() {    
    return (
        <>
            <Search data={fetchData} enter={enterKey}/>   
            <InfiniteScroll next={OnNextPage} hasMore={true} dataLength={'5'}>
            <div id="post-main">
                {/* <div className="post-1">
                <div className="user-profile">             
                    <div className="handle">
                        <div className="user-prof"></div>
                        <div className="user-name">Faiz Shaikh</div>
                        <div className="user-handle">@faizsk22<span className="divide">•</span></div>
                        <div className="user-date">1h</div>
                    </div>
                </div>
                <div className="user-text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Egestas dui id ornare arcu.
                </div>
                <div className="user-video">
                    <div className="tweet-video"></div>
                </div>
                <div className="user-img">
                    <div className="tweet-img"></div>
                </div>
            </div> */}
            </div>
            </InfiniteScroll>
            <button id="moreButton" onClick={OnNextPage}><i className="fas fa-arrow-down"></i></button>
        </>
    )
}
export default Post
