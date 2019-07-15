require('../../pages/imdbPage');
const googleSearch = require('./allTests');

module.exports = {
    before : browser => {
        const google = browser.page.googlePage();
    
        google
        .navigate()
        .waitForElementVisible('body', 2000)
        .assert.title('Google')
        .assert.visible('@googleSearchInput')
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
    after : browser => {
        browser.end();
    },
tags: ['imdbSearch'],
'Clicking on randomly chosen star' : async (browser) => {
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
    }
}