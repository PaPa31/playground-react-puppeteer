const puppeteer = require("puppeteer");

async function getPTag({ browserWSEndpoint, url }) {
  // fetch our running browser
  const browser = await puppeteer.connect({
    browserWSEndpoint
  });

  // start the actual automation
  const page = await browser.newPage();

  try {
    await page.goto(url, { waitUntil: "load", timeout: 0 });

    const result = await page.evaluate(
      () =>
        Array.from(document.querySelector("main").querySelectorAll("p")).map(
          elem => elem.innerHTML
        )
      //.join(",\n")
    );

    // cleanup
    await page.close();
    await browser.close();
    return result;
  } catch (err) {
    console.error(err.message);
    return false;
  }
}

export default getPTag;
