const imdb = require('./imdb_simplified')
const utils = require('../../pages/utils/imdbActorUtils')

require('../../pages/imdbActorPage')

module.exports = {
    tags: ['simplifiedActor'],
    before : browser => {
       imdb.before (browser);
       imdb["Clicking on randomly chosen star"](browser);
    },
    after : browser => {
       utils(browser).closeBrowser();
    },
    'List out actor related news with link to it ': browser => {  
        const news = browser.page.imdbActorPage().elements.actorTopRelatedNews.selector;
        
        utils(browser).isElementPresent(news); 

        browser
            .getText(news, result => {
                utils(browser).appendTXT(`\nTop news:\n${result.value}`);
            })
            .getAttribute(news, 'href', result => {
                utils(browser).appendTXT(`\nLink:\n${result.value}`);   
            });
        utils(browser).clickOnRatings();
        
    }
}

