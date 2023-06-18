'use strict';

// import all components and functions

import { sidebar } from "./sidebar.js";
import { api_key, fetchDataFromServer, imageBaseUrl } from "./api.js";
import {createMovieCard} from "./movie-card.js"
import { search } from "./search.js";


const pageContent = document.querySelector('[page-content]');

sidebar();



// Home page sections (Top rated, Upcoming, Trending movies)

const homePageSections = [
    {
        title: "Upcoming Movies",
        path: "/movie/upcoming"
    },

    {
        title: "This Week Trending Movies",
        path: "/trending/movie/week"
    },

    {
        title: "Today\'s Trending Movies",
        path: "/movie/top_rated"
    }

]



// fetch all genres eg: [{"id": "123", "name": "Action"}] then change genre format eg: {123: "Action"}

const genreList = {

    // create genre string from genre_id eg: [23, 43] => "Action, Romance".
    asString(genreIdList) {
        let newGenreList = [];
        for (const genreId of genreIdList) {
            this[genreId] && newGenreList.push(this[genreId]);// this === genreList
        }

        return newGenreList.join(', ');
    }
};

fetchDataFromServer(`https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}`, function ({ genres }) {
    for (const { id, name } of genres) {
        genreList[id] = name;
        console.log(name);
    }
    fetchDataFromServer(`https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=en-US&page=1`, heroBanner);

});



const heroBanner = function ({ results: movieList }) {
    const banner = document.createElement('section');
    console.log(banner);
    banner.classList.add('banner');
    banner.ariaLabel = 'popular movies';
    banner.innerHTML = `
    <div class="banner-slider"></div>
    <div class="slider-control">
        <div class="control-inner"></div>
    </div>
    `;

    let controlItemIndex = 0;
    for (const [index, movie] of movieList.entries()) {
        const {
            backdrop_path,
            title,
            release_date,
            genre_ids,
            overview,
            poster_path,
            vote_average,
            id
        } = movie;
        console.log(title);


        const sliderItem = document.createElement('div');
        sliderItem.classList.add('slider-item');
        sliderItem.setAttribute('slider-item', '');

        sliderItem.innerHTML = `
         <img src="${imageBaseUrl}w1280${backdrop_path}" alt="${title}" loading="${index === 0 ? 'eager' : 'lazy'}" class="img-cover">
                    <div class="banner-content">
                        <h2 class="heading">${title}</h2>
                        <div class="meta-list">
                            <div class="meta-item">${release_date.split('-')[0]}</div>
                            <div class="meta-item card-badge">${vote_average.toFixed(1)}</div>
                        </div>
                        <p class="genre">${genreList.asString(genre_ids)}</p>
                        <p class="banner-text">${overview}</p>
                        <a href="../detail.html" class="btn" onclick="getMovieDetail(${id})">
                            <img src="/assets/images/play_circle.png" width="24" height="24" aria-hidden="true" alt="play_circle">
                            <span class="span">Watch Now</span>
                        </a>
                    </div>
        `;

        banner.querySelector('.banner-slider').appendChild(sliderItem);

        const controlItem = document.createElement('button');
        controlItem.classList.add('poster-box', 'slider-item');
        controlItem.setAttribute('slider-control', `${controlItemIndex}`);
        controlItemIndex++;
        controlItem.innerHTML = `
          <img src="${imageBaseUrl}w154${poster_path}" loading="lazy" alt="slide to ${title}" draggable="false" class="img-cover">
        `;
        banner.querySelector('.control-inner').appendChild(controlItem);

    }

    pageContent.appendChild(banner);

    addHeroSlide();
    // https://api.themoviedb.org/3/movie/upcoming?api_key=e2d948b748bca3d1d70b7f539fa4d559&page=1
    // fetching data for home page sections (Top rated, Upcoming, Trending movies)

    for (const { title, path } of homePageSections) {
        fetchDataFromServer(`https://api.themoviedb.org/3${path}?api_key=${api_key}&page=1`, createMovieList, title);
    }

}


// Hero slider functionality
const addHeroSlide = function () {
    const sliderItems = document.querySelectorAll('[slider-item]');
    const sliderControls = document.querySelectorAll('[slider-control]');

    let lastSliderItem = sliderItems[0];
    let lastSlidercontrol = sliderControls[0];

    lastSliderItem.classList.add('active');
    lastSlidercontrol.classList.add('active');

    const sliderStart = function () {
        lastSliderItem.classList.remove('active');
        lastSlidercontrol.classList.remove('active');

        // this === slider-control
        sliderItems[Number(this.getAttribute('slider-control'))].classList.add('active');
        this.classList.add('active');

        lastSliderItem = sliderItems[Number(this.getAttribute('slider-control'))];
        lastSlidercontrol = this;
    }

    addEventOnElements(sliderControls, "click", sliderStart);

}


const createMovieList = function ({ results: movieList }, title) {
    const movieListElem = document.createElement('section');
    movieListElem.classList.add('movie-list');
    movieListElem.ariaLabel = `${title}`;
    movieListElem.innerHTML = `
    <div class="title-wrapper">
    <h3 class="title-large">${title}</h3>
    </div>
    <div class="slider-list">
    <div class="slider-inner"></div>
    </div>
    `;
    
    for (const movie of movieList) {
        const movieCard = createMovieCard(movie); // called from movie_card.js
        movieListElem.querySelector('.slider-inner').appendChild(movieCard);
    }
    
    pageContent.appendChild(movieListElem);

}


search();


