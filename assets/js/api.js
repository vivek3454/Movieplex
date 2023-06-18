'use strict';

const api_key = 'e2d948b748bca3d1d70b7f539fa4d559';
const imageBaseUrl = 'https://image.tmdb.org/t/p/';

const fetchDataFromServer = function (url, callback, optionalParam) {
    fetch(url)
    .then(response => response.json())
    .then(data => callback(data, optionalParam));
}


export{imageBaseUrl, api_key, fetchDataFromServer}
