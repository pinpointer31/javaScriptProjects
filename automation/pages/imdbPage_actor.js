module.exports = {
    elements: {
         movieOne: {
            selector: 'div:nth-child(1) > div.knownfor-title-role > a',
            locateStrategy: 'css',
            timeout: 1000,
        },
         movieTwo: {
           selector: 'div:nth-child(2) > div.knownfor-title-role > a',
           locateStrategy: 'css',
           timeout: 1000,
         },
         movieThree:{
             selector: 'div:nth-child(3) > div.knownfor-title-role > a',
             locateStrategy: 'css',
             timeout: 1000,
         },
         movieFour: {
            selector: 'div.knownfor-title.last > div.knownfor-title-role > a',
            locateStrategy: 'css',
            timeout: 1000,
         },
         actorTopRelatedNews: {
           selector: '.aux-content-widget-2 > .ipl-simple-list > li:nth-child(2) > a',
           locateStrategy: 'css',
           timeout: 1000,
         },
         rating: {
           selector: 'strong > span',
           locateStrategy: 'css',
           timeout: 1000,
         }
    }
}