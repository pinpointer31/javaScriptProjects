module.exports = {
    tags: ['google'],
    beforeEach: (browser, done) =>  {
        const textInput = 'input[type=text]';
        const googleURL = 'http://www.google.com';
        setTimeout(function() {
            browser
            .url(googleURL) // Go to a url
            .assert.title('Google') // Make sure Site title matches
            .assert.visible(textInput);
            done();
        }, 1000);
    },
    afterEach: (browser) =>  {
        browser.end();
    },
    'Searching for nightwatch' : (browser) => {
        const inputField = 'input[type=text]';
        const searchButton = 'div.aajZCb > div.VlcLAe > center > input.gNO89b';

         browser 
         .setValue(inputField, 'nightwatchjs') // send values
         .waitForElementVisible(searchButton)
         .click(searchButton) // click on search box
         .pause(1000);
       }
 };