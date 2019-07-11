module.exports = {
tags: ['bonusExercise'],
before : (browser) => {
    const googleSearchInput = 'input[type=text]';
    
    browser
    .url('http://www.google.com')
    .waitForElementVisible('body', 2000)
    .assert.title('Google')
    .assert.visible(googleSearchInput)
    .pause(2000);
},
after : (browser) => {
    browser
    .end();
},
'Searching for Interstellar' : (browser) => {
    const searchButton = 'div.aajZCb > div.VlcLAe > center > input.gNO89b',
          googleSearchInput = 'input[type=text]',
          interstellarIMDB_page = 'div.r > a[href*="https://www.imdb.com/title/tt0816692/"]:first-child'; 

    browser
    .setValue(googleSearchInput, 'interstellar')
    .waitForElementVisible(searchButton, 2000)
    .click(searchButton)
    .waitForElementVisible(interstellarIMDB_page, 2000)
    .assert.visible(interstellarIMDB_page)
    .pause(3000);
},
 'Navigating to Interstellar IMDb page' : (browser) => {  
    const interstellarIMDB_page ='div.r > a[href*="https://www.imdb.com/title/tt0816692/"]:first-child';

    browser
    .click(interstellarIMDB_page)
    .waitForElementVisible('body',3000)
    .assert.title('Interstellar (2014) - IMDb')
    .pause(3000);

},'Clicking on randomly chosen star' : async (browser) => {
    const actors = [
        firstActor = 'div.plot_summary > div:nth-child(4) > a:nth-child(2)',
        secondActor = 'div.plot_summary > div:nth-child(4) > a:nth-child(3)', 
        thirdActor = 'div.plot_summary > div:nth-child(4) > a:nth-child(4)'],
    //generating random index between 0-2 to select random actor selector
        randomActor = actors[Math.trunc(Math.random() * 2)],
    //returning text from locator (which returns an object with sessionID+index+value)
        actorSaved = await browser.getText(randomActor);
    //saving value in actorSaved
    
    console.log('\nThe chosen actor is: '+ actorSaved.value+ '\n');
    
    browser.click(randomActor);
    browser.assert.title(actorSaved.value + ' - IMDb');

},'Search for at least 4 movies on IMDB and save the movie ratings' : async (browser) => {
    const movies = [
        movieOne = 'div:nth-child(1) > div.knownfor-title-role > a',
        movieTwo = 'div:nth-child(2) > div.knownfor-title-role > a',
        movieThree = 'div:nth-child(3) > div.knownfor-title-role > a',
        movieFour = 'div.knownfor-title.last > div.knownfor-title-role > a'
    ],  movieResults = [], movieTitles = [];

    for (let index = 0; index < movies.length; index++) { 
        browser.expect.element(movies[index]).to.be.present;

        movieResults[index] = await browser.getText(movies[index]);
        movieTitles[index] = movieResults[index].value; 
    }
    
    console.log('\nThe four main movies of the actor are : \n');
    
    movieTitles.forEach((element) => {
        console.log(element);
    });

},'Search for news: use one of the main characters and save the link of the page (href)' : async (browser) => {
    const actorTopRelatedNews = '.aux-content-widget-2 > .ipl-simple-list > li:nth-child(2) > a';
    
    browser.expect.element(actorTopRelatedNews).to.be.present;
    const actorTopRelatedNewsText = await browser.getText(actorTopRelatedNews),
          newsLink = await browser.getAttribute(actorTopRelatedNews, 'href');

    console.log('\nTop news:\n' + actorTopRelatedNewsText.value +'\nLink:\n'+ newsLink.value);
}   
};