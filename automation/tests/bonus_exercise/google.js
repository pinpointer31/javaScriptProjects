require('../../pages/googlePage');

module.exports = {
tags: ['google'],
before : browser =>  {
        const google = browser.page.googlePage();
        google 
        .navigate()
        .waitForElementVisible('body', 2000)
        .assert.title('Google')
        .assert.visible('@googleSearchInput');
    },
    after : browser => {
        browser.end(()=>{
            browser.verify.ok(true, 'Browser closed without error.')
        })
    },
'Searching for Interstellar' : browser => {
    const google = browser.page.googlePage();

    google
        .setValue('@googleSearchInput', 'interstellar', ()=>{
            browser.verify.ok(true, 'Value could be set to @googleSearchInput');
        })
        .waitForElementVisible('@searchButton', 2000)
        .click('@searchButton', () => {
            google.verify.ok(true, 'Click is works on searchButton');
        })
        .waitForElementVisible('@movieLink', 2000)
        .assert.visible('@movieLink')
        .click('@movieLink', () =>{
            google.verify.ok(true, 'Click is workins on @movieLink');
        });
}
};