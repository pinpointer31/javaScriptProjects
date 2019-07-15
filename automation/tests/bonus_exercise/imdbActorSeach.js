module.exports = {
    tags: ['imdbActorSearch'],
    'List out four movies and related news of chosen actor ' : async browser => {
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
}