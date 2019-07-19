require('../imdbPage');

module.exports = function(browser) {
    const fs = require('fs');
    const filePath = 'log/bonus_exercise.txt';

    this.closeBrowser = function (){
        browser
        .end(function() {
            browser.verify.ok(true, 'Browser closed without error.')
        });
    };
    this.clickOnRandomStar = function (randomStar){
        browser.click(randomStar,()=>{
            browser.verify.ok(true, 'Click is workins on randomly chosen actor');
        });
    };

    this.isAt = function(title){
        browser
            .waitForElementVisible('body',3000);
        browser
            .assert.title(title);
    };
    
    this.appendTXT =  async function (header, log){
        fs.appendFileSync(filePath, header, (err) => {
            if(err) throw err;
            console.log(log);
        });
    }
    return this;
}