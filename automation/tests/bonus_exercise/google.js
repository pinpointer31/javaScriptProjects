const utils = require('../../pages/utils/googleUtils')

module.exports = {
tags: ['google'],
before : browser => {
        utils(browser).openBrowser();
    },
after : browser => {
        utils(browser).closeBrowser();
    },
'Searching for Interstellar' : browser => {
        utils(browser).searchForInterstellar();
        utils(browser).createTXTFile(
            'The chosen movie is: \nInterstellar\n',
            'bonus_exercise.txt successfully created');  
}
};