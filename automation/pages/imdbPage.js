module.exports = {
    elements: {
        firstActor: {
            selector: 'div.plot_summary > div:nth-child(4) > a:nth-child(2)',
            locateStrategy: 'css',
            timeout: 1000,
        },
         secondActor: {
            selector: 'div.plot_summary > div:nth-child(4) > a:nth-child(3)',
            locateStrategy: 'css',
            timeout: 1000,
        },
        thirdActor: {
            selector: 'div.plot_summary > div:nth-child(4) > a:nth-child(4)',
            locateStrategy: 'css',
            timeout: 1000,
        }
    }
}