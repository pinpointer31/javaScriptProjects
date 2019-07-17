module.exports = {
    elements: {
        googleSearchInput: {
            selector: 'input[type=text]',
            locateStrategy: 'css',
            timeout: 1000,
        },
        searchButton: {
            selector: 'div.aajZCb > div.VlcLAe > center > input.gNO89b',
            locateStrategy: 'css',
            timeout: 1000,
        },
        movieLink:{
            selector: 'div.r > a[href*="https://www.imdb.com/title/tt0816692/"]:first-child',
            locateStrategy: 'css',
            timeout: 1000,
        } 
  }
};