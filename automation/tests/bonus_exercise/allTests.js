require('../../pages/googlePage');
require('../../pages/imdbPage');
require('../../pages/imdbPage_actor')
module.exports = {
    before : function(browser) {
        const google = browser.page.googlePage();
    
        google
        .navigate()
        .waitForElementVisible('body', 2000)
        .assert.title('Google')
        .assert.visible('@googleSearchInput');
    },
    after : function (browser) {
        browser.end();
    }
, 
tags: ['BonusExercise'],
'Searching for Interstellar' : function (browser) {
    const google = browser.page.googlePage();

    google
        .setValue('@googleSearchInput', 'interstellar')
        .waitForElementVisible('@searchButton', 2000)
        .click('@searchButton', () => {
            google.verify.ok(true, 'Click is works on searchButton');
        })
        .waitForElementVisible('@movieLink', 2000)
        .assert.visible('@movieLink')
        .click('@movieLink', () =>{
            google.verify.ok(true, 'Click is workins on @movieLink');
        });
},
 'Clicking on randomly chosen star' : async function(browser) {
    const imdb = browser.page.imdbPage(),
     actor = imdb.elements,
     actors = [
        actor.firstActor.selector,
        actor.secondActor.selector,
        actor.thirdActor.selector
    ],
     randomActor = actors[Math.trunc(Math.random()*2)],
     actorSaved = await browser.getText(randomActor);

    imdb.waitForElementVisible('body',3000);
    imdb.assert.title('Interstellar (2014) - IMDb');

    console.log('\nThe chosen actor is: '+ await actorSaved.value+ '\n');
    
    imdb.click(randomActor,()=>{
        imdb.verify.ok(true, 'Click is workins on randomly chosen actor');
    });

    imdb.assert.title(actorSaved.value + ' - IMDb');
},
 'List out four movies and related news of chosen actor ' : async function (browser) {
    const imdb_actor = browser.page.imdbPage_actor(),
          movie = imdb_actor.elements,
          news = imdb_actor.elements.actorTopRelatedNews;

    const movies= [
        movie.movieOne.selector, 
        movie.movieTwo.selector,
        movie.movieThree.selector,
        movie.movieFour.selector
    ],
    movieResults = [], movieTitles = [];

    movies.forEach(element => {
        imdb_actor.expect.element(element).to.be.present
    });
        imdb_actor.expect.element('@actorTopRelatedNews').to.be.present;

     for (let i = 0; i < movies.length; i++) { 
         movieResults[i] = await browser.getText(movies[i]);
         movieTitles[i] = movieResults[i].value; 
     }

     console.log('\nThe four main movies of the actor are : \n');
     movieTitles.forEach(element => {
        console.log(element);
     });

    const actorTopRelatedNewsText = await browser.getText(news.selector),
          newsLink = await browser.getAttribute(news.selector, 'href');

     console.log(
         '\nTop news:\n' + actorTopRelatedNewsText.value 
         +'\nLink:\n'+ newsLink.value);
 }    
};