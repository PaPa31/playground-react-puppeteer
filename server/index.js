const puppeteer = require("puppeteer");
const http = require("http");
const httpProxy = require("http-proxy");
const proxy = new httpProxy.createProxyServer();
const port = 4000;

http
  .createServer()
  .on("upgrade", async (req, socket, head) => {
    const browser = await puppeteer.launch({
      args: [
        "--disable-gpu",
        "--no-sandbox",
        "--lang=en-US",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
      ],
      headless: false,
    });
    const target = browser.wsEndpoint();

    proxy.ws(req, socket, head, { target });
  })
  .on("error", function (err, req, res) {
    console.log(err);
  })
  .listen(port, function () {
    console.log(`proxy server running at ${port}`);
  });
