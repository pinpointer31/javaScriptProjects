module.exports = {
    elements: {
        sortHeader: {
            selector: '#main > div > h1',
        },
        featureFilm: {
            selector: 'div.faceter-fieldset.title_type > fieldset > label:nth-child(5) > input[type=checkbox]',
        },
        featureFilmCounter: {
            selector: 'div.faceter-fieldset.title_type > fieldset > label:nth-child(5) > span:nth-child(3)',
        },
        firstMovie: {
            selector: 'div:nth-child(1) > div.lister-item-content > h3 > a',  
        },
        firstMovieRating: {
            selector: 'div:nth-child(1) > div.lister-item-content > div > div.inline-block.ratings-imdb-rating > strong',
        },
        secondMovie: {
            selector: 'div:nth-child(2) > div.lister-item-content > h3 > a',
        },
        secondMovieRating: {
            selector: 'div:nth-child(2) > div.lister-item-content > div > div.inline-block.ratings-imdb-rating > strong',
        },
        thirdMovie: {
            selector: 'div:nth-child(3) > div.lister-item-content > h3 > a', 
        },
        thirdMovieRating: {
            selector: 'div:nth-child(3) > div.lister-item-content > div > div.inline-block.ratings-imdb-rating > strong',
        },
        fourthMovie: {
            selector: 'div:nth-child(4) > div.lister-item-content > h3 > a',
        },
        fourthMovieRating: {
            selector: 'div:nth-child(4) > div.lister-item-content > div > div.inline-block.ratings-imdb-rating > strong',
        }
    }
}