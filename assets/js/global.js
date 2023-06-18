
// add event on multiple elements
let elements = []
const addEventOnElements = function (elements, eventType, calback) {
    for(const element of elements) element.addEventListener(eventType, calback);
}


// toggle search box in mobile device || small screen

const searchBox = document.querySelector('[search-box]')
const menuToggler = document.querySelector('[menu-toggler]')
const searchTogglers = document.querySelectorAll('[search-toggler]')

addEventOnElements(searchTogglers, 'click', function(){
    searchBox.classList.toggle('active');
})

// menuToggler.addEventListener('click', ()=>{
//     menuToggler.classList.toggle('active');
// })



// store movieId in 'localStorage' when you click any movie card

const getMovieDetail = function (movieId) {
    window.localStorage.setItem("movieId", String(movieId));
}

const getMovieList = function (urlParam, genreName) {
    window.localStorage.setItem("urlParam", urlParam);
    window.localStorage.setItem("genreName", genreName);
}


