const imdbActor = require('./imdbActor_simplified');
const utils = require('../../pages/utils/moviesSortUtils')
require('../../pages/moviesPage');

module.exports = {
    tags: ['moviesSort'],
    before : browser => {
        imdbActor.before (browser);
        imdbActor["List out actor related news with link to it "](browser);
    },
    after : browser => {
        utils(browser).closeBrowser();
    },
    'List out all the movies and assert if they are correctly ordered by ratings' : browser => {
        const movies = [
            browser.page.moviesPage().elements.firstMovie.selector, 
            browser.page.moviesPage().elements.secondMovie.selector,
            browser.page.moviesPage().elements.thirdMovie.selector,
            browser.page.moviesPage().elements.fourthMovie.selector
        ];
        const ratings = [
            browser.page.moviesPage().elements.firstMovieRating.selector, 
            browser.page.moviesPage().elements.secondMovieRating.selector,
            browser.page.moviesPage().elements.thirdMovieRating.selector,
            browser.page.moviesPage().elements.fourthMovieRating.selector
        ];
        
        utils(browser).isAt(`Highest Rated  Movies and TV Shows`);
        utils(browser).clickOnFeaturedFilm();
        utils(browser).featuredFilmIsPresent();
        browser
            .waitForElementVisible('body',1000,()=>{
                utils(browser).appendTXT('\n\nThe four movies are:\n');
        });
        for (let index = 0; index < movies.length; index++){
            browser
                .getText(movies[index], movie => {
                    utils(browser).appendTXT(`${movie.value} | `);
                })
                .getText(ratings[index], rating => {
                    utils(browser).appendTXT(`${rating.value}\n`);
            });
        }
        
    }
}