const apiKey ="api_key=21a47e06c3dfb5aa9c0ce795329e2b73";
const baseUrl = "https://api.themoviedb.org/3";
const apiUrl = baseUrl + '/discover/movie?sort_by=popularity.desc&'+apiKey;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
let main = document.getElementById('main');
const form = document.getElementById('form');
const searchUrl = baseUrl +'/search/movie?'+apiKey;
const search = document.getElementById('search');

function getMovies(url){

    fetch(url).then(res=> res.json()).then(data=>{
        console.log(data.results);
        showMovies(data.results);
    })

}
getMovies(apiUrl);


function showMovies(data){
    main.innerHTML = '';
    data.forEach(movie=> {

        const {title, poster_path,vote_average, overview} = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML=`
        <div class="movie">
        <img src="${IMG_URL+poster_path}" alt = "${title}">

        <div class="movie-info">
        
            <h3>${title}</h3>
            <span class="${getColor(vote_average)}">${vote_average}</span>
        
        </div>

        <div class="overview">
        <h3>Overview</h3>
        ${overview}
        </div>
        </div>
        `
        main.appendChild(movieEl);
    })
}

function getColor(avg){
    if(avg >= 8) return 'green';
    else if(avg >= 5) return 'orange';
    else return 'red';
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();

    const searchName = search.value;
    if(searchName) {
        getMovies(searchUrl+'&query='+searchName);
    }
})