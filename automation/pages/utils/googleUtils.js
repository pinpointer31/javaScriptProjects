require('../googlePage');

module.exports = function(browser) {
    const google = browser.page.googlePage(); 

    const fs = require('fs');
    const filePath = 'log/bonus_exercise.txt';

    this.openBrowser = function (){
        browser
            .windowMaximize()
            .url('http://google.com')
            .waitForElementVisible('body', 2000)
            .assert.title('Google');

        google
            .assert.visible('@googleSearchInput');
    };
    this.closeBrowser = function (){
        browser
            .end(function() {
                browser.verify.ok(true, 'Browser closed without error.')
            });
    };
    this.searchForInterstellar = function (){
        google
            .setValue('@googleSearchInput', 'interstellar', ()=>{
                browser.verify.ok(true, 'Value could be set to @googleSearchInput');
            });
        google
            .waitForElementVisible('@searchButton', 2000);
        google
            .click('@searchButton', () => {
                google.verify.ok(true, 'Click is works on searchButton');
            });
        google
            .waitForElementVisible('@movieLink', 2000);
        google
            .assert.visible('@movieLink');
        google
            .click('@movieLink', () =>{
                google.verify.ok(true, 'Click is workins on @movieLink');
            });
    };

    this.createTXTFile = function (header, log){
        fs.writeFile(filePath, header, (err)=>{
            if(err) throw err;
            console.log(log)
        });    
    };

    return this;
};