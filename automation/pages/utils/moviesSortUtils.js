require('../moviesPage');

module.exports = function (browser) {
    const fs = require('fs');
    const filePath = 'log/bonus_exercise.txt';
    
    const sortHeader = browser.page.moviesPage().elements.sortHeader.selector;
    const featureFilm = browser.page.moviesPage().elements.featureFilm.selector;
    const featureFilmCounter = browser.page.moviesPage().elements.featureFilmCounter.selector;

    this.closeBrowser = function (){
        browser
            .end(function() {
                browser.verify.ok(true, 'Browser closed without error.');
        });
    };
    this.isAt = function(title){
        browser
            .waitForElementVisible('body',3000);
        browser
            .assert.title(title);
    };
    this.appendTXT =  async function (header){
        fs.appendFileSync(filePath, header, (err) => {
            if(err) throw err;
        });
    };
    this.isAt = function(word){
        browser
            .waitForElementVisible('body',3000)
            .getTitle(function (title) {
                if(JSON.stringify(title).includes(word)) browser.verify.ok(true, 'page title is correct');
            });
    };
    this.featuredFilmIsPresent = function () {
        browser
            .waitForElementPresent(sortHeader, 3000, ()=>{
                browser
                    .assert.containsText(sortHeader, 'Feature Films', 'Contains Text');
        });
    };
    this.clickOnFeaturedFilm = function () {
        browser
            .click(featureFilm, ()=>{
                browser
                    .verify.ok(true, `click worked on ${featureFilm}`);
                browser
                    .waitForElementNotPresent(featureFilmCounter, 3000);
        });
    };

    return this;
}