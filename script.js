let $container = document.getElementById("container");
let $input = document.getElementById("input");
let $button = document.getElementById("button");
let $showMovie = document.getElementById("showMovie");


let page = 1;

$showMovie.addEventListener("click", () => {
    page++;
    popularMovies();
})



const popularMovies = async () => {
    try {
        let api_key = "192e0b9821564f26f52949758ea3c473";
        let api = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=es-MX-&page=${page}`);
        let json = await api.json();
        getMovie(api, json);
    } 
    catch (error) {
        
    }
}

//https://api.themoviedb.org/3/search/movie?api_key=1cf50e6248dc270629e802686245c2c8&query=venom

$button.addEventListener("click", () => {
    const search = async () => {
        try {
            let api_key = "192e0b9821564f26f52949758ea3c473";
            let api = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${$input.value}`);
            let json = await api.json();
            console.log(json)
            getMovie(api, json)
        }
        catch (error) {
        }
    }
    search();
})

const getMovie = (api, data) => {
    if (api.status == 200) {
        for (let i = 0; i <= data.results.length; i++) {
            if (data.results[i].backdrop_path == null) {
                
            }else {
                $container.insertAdjacentHTML("beforeend", `
                <div class="image-movies">
                    <img loading="lazy" src="https://image.tmdb.org/t/p/original${data.results[i].backdrop_path}"/>
                    <span class="placeholder col-12 placeholder-lg">
                        <p>${data.results[i].title}<button id="buttonInformation" onclick="more(this)" value="${data.results[i].overview}">...More</button></p>
                    </span>
                </div>`);
            }
        }
    }else if (api.status == 404) {
        $container.insertAdjacentHTML("beforeend", "<h1>Error 404 page not found</h1>");
    }else {
        $container.insertAdjacentHTML("beforeend", "<h1>an error occurred, please try again</h1>");
    }
}


const searchMovie = (api, data) => {
    if (api.status == 200) {
        for (let i = 0; i <= data.results.length; i++) {
            if (data.results[i].backdrop_path == null) {
                
            }else {
                $container.insertAdjacentHTML("beforeend", `
                <div class="image-movies">
                    <img loading="lazy" src="https://image.tmdb.org/t/p/original${data.results[i].backdrop_path}"/>
                    <span class="placeholder col-12 placeholder-lg">
                        <p>${data.results[i].title}<button id="buttonInformation" onclick="more(this)" value="${data.results[i].overview}">...More</button></p>
                    </span>
                </div>`);
            }
        }
    }else if (api.status == 404) {
        $container.insertAdjacentHTML("beforeend", "<h1>Error 404 page not found</h1>");
    }else {
        $container.insertAdjacentHTML("beforeend", "<h1>an error occurred, please try again</h1>");
    }
}

popularMovies();

const more = (element) => {
    element.parentElement.insertAdjacentHTML("beforeend", `<br><t>${element.value}</t>`)
    element.remove();
    
}


//img: https://image.tmdb.org/t/p/original
//original_language
//original_title
//overview
//popularity
//release_date
//title
//vote_average
//vote_count