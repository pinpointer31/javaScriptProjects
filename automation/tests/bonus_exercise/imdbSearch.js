const google = require('./google');
const utils = require('../../pages/utils/imdbUtils')

module.exports = {
    tags: ['imdbSearch'],
    before: browser => {
        google.before (browser);
        google["Searching for Interstellar"](browser);
    },
    after : browser => {
        utils(browser).closeBrowser();
    },
    'Clicking on randomly chosen star' : browser => {
    const actors = [
            browser.page.imdbPage().elements.firstActor.selector,
            browser.page.imdbPage().elements.secondActor.selector,
            browser.page.imdbPage().elements.thirdActor.selector
            ];
    const randomActor = actors[Math.trunc(Math.random()*2)]; 

    utils(browser).isAt('Interstellar (2014) - IMDb');

    browser
        .getText(randomActor, result => {
            utils(browser).appendTXT(
                `\nThe chosen actor is: \n${result.value}\n`, 
                'bonus_exercise.txt successfully appended (actor)');
            utils(browser).clickOnRandomStar(randomActor);
            utils(browser).isAt(`${result.value} - IMDb`);
    });    
    }
}