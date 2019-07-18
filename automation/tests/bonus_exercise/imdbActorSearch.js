const imdb = require('./imdbSearch')
const utils = require('../../pages/utils/imdbActorUtils')
const { orderBy } = require('natural-orderby');

require('../../pages/imdbActorPage')

module.exports = {
    tags: ['imdbActorSearch'],
    before : browser => {
       imdb.before (browser);
       imdb["Clicking on randomly chosen star"](browser);
    },
    after : browser => {
       utils(browser).closeBrowser();
    },
    'List out four movies by ratings sorted & related news of chosen actor ' : browser => {  
    const news = browser.page.imdbActorPage().elements.actorTopRelatedNews.selector;
    const rating = browser.page.imdbActorPage().elements.rating.selector;
    const title = browser.page.imdbActorPage().elements.movieTitle.selector;

    const movies = [
        browser.page.imdbActorPage().elements.movieOne.selector, 
        browser.page.imdbActorPage().elements.movieTwo.selector,
        browser.page.imdbActorPage().elements.movieThree.selector,
        browser.page.imdbActorPage().elements.movieFour.selector
    ],
    moviesWithRatings = [];  

    utils(browser).isElementPresent(news); 

    browser.getText(news, (result)=> {
        utils(browser).appendTXT(`\nTop news:\n${result.value}\n`);
    });

    browser.getAttribute(news, 'href', (result)=>{
        utils(browser).appendTXT(`Link:\n${result.value}`);
    });

    movies.forEach(movie =>{
        utils(browser).isElementPresent(movie);
        utils(browser).openInNewWindow(movie);
        browser.pause(1000);
    });
    
    browser.windowHandles(function (handles) {
        for(let handleIndex = movies.length, index = 0; handleIndex >= 1; handleIndex--, index++){
            browser.switchWindow(handles.value[handleIndex], function () {
                    browser
                        .getText(rating, rating=>{
                            moviesWithRatings[index] = rating.value;
                        })
                        .getText(title, title => {
                            moviesWithRatings[index] = moviesWithRatings[index].concat(` ${title.value}`);
                        });             
            });
        }
        utils(browser).appendTXT('\n\nThe four movies are:');
        browser
            .waitForElementPresent('body', 2000, async ()=>{
                const ordered = await orderBy(moviesWithRatings,'asc');
                ordered.forEach(movie =>{
                    utils(browser).appendTXT(`\n${movie}`);
                })
        })
    });
    }
}

