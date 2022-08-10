// import puppeteer from "puppeteer";
const puppeteer = require('puppeteer');

async function getTitle({ browserWSEndpoint, url }) {
  // fetch our running browser
  const browser = await puppeteer.connect({
    browserWSEndpoint
  });

  // start the actual automation
  const page = await browser.newPage();
  //await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36');
  //await page.setDefaultNavigationTimeout(0);

  try {
    await page.goto(url, { waitUntil: 'load', timeout: 0 });

    const result = page.evaluate(
      () =>
      Array.from(document.querySelector("main").querySelectorAll("p")).map(
        (elem) => elem.innerHTML
      ).join(",\n")
    );
    
    return result
  } catch (err) {
    console.error(err.message);
    return false;
  }

  //await page.goto(url, { waitUntil: 'load', timeout: 0 });
  

  //const result = await page.title();
  
  //// cleanup
  //await page.close();
  //await browser.close();

  //return result;
}

export default getTitle;