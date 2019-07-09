module.exports = {
tags: ['automationPractice'],
beforeEach: (browser) =>  {
    const automationPracticeURL = 'http://automationpractice.com/index.php';

    browser
    .url(automationPracticeURL) // Go to testautomation practice
    .waitForElementVisible('body', 2000)
    .assert.title('My Store') //title is My Store
},
afterEach: (browser) =>  {
    browser.end();
},
'Automation Website basic navigation test' : function (browser) {
    const tShirtsButton = '#block_top_menu > ul > li:nth-child(3) > a';
    const shirt = '#center_column > ul > li > div > div.left-block > div > a.product_img_link';

    browser
    .assert.visible(tShirtsButton) //assert that t-shorts is visible
    .click(tShirtsButton)
    .waitForElementVisible('body', 3000)
    .assert.visible(shirt)
    .click(shirt)
    .assert.title('Faded Short Sleeve T-shirts - My Store')
    .pause(2000);
    }
};