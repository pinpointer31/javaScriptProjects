const imdb = require('./imdbSearch')
const utils = require('../../pages/utils/imdbActorUtils')
require('../../pages/imdbPage_actor')


module.exports = {
    tags: ['imdbActorSearch'],
    before : async browser => {
       imdb.before (browser);
       imdb["Clicking on randomly chosen star"](browser);
    },
    after : browser => {
       utils(browser).closeBrowser();
    },
    'List out four movies by ratings sorted & related news of chosen actor ' : browser => {  
        const news = browser.page.imdbPage_actor().elements.actorTopRelatedNews.selector;
        const movies = [
            browser.page.imdbPage_actor().elements.movieOne.selector, 
            browser.page.imdbPage_actor().elements.movieTwo.selector,
            browser.page.imdbPage_actor().elements.movieThree.selector,
            browser.page.imdbPage_actor().elements.movieFour.selector
        ],
        movieTitles = [];  

        utils(browser).isElementPresent(news); 

        movies.forEach(movie =>{
            utils(browser).openInNewWindow(movie);
            browser.pause(3000);
        })


        let index = 0;
        movies.forEach(movie=> {
            browser.getText(movie, (result)=> {
                utils(browser).isElementPresent(movie);
                utils(browser).appendTXT(`\nMovie ${index+1}:\n`);
                movieTitles[index] = result.value;
                utils(browser).appendTXT(`${movieTitles[index]}\n`);
                index++;
            });
        });

        browser.getText(news, (result)=> {
            utils(browser).appendTXT(`\nTop news:\n${result.value}\n`);
        });

        browser.getAttribute(news, 'href', (result)=>{
            utils(browser).appendTXT(`Link:\n${result.value}`);
        });

     }
}