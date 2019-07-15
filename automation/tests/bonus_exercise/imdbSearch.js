const google = require('./google');
require('../../pages/imdbPage');

module.exports = {
    tags: ['imdbSearch'],
    before: browser => {
        google.before (browser);
        google["Searching for Interstellar"](browser);
    },
    after : browser => {
        browser.end(()=>{
            browser.verify.ok(true, 'Browser closed without error.')
        })
    },
    'Clicking on randomly chosen star' : async browser => {
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