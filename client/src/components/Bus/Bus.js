import React, { Component } from "react";
import "./bus.css";
import BusRoutes from "../BusRoutes/BusRoutes";
import puppeteer from "../../../puppeteer";

class Bus extends Component {
  state = {
    id: "",
    buses: [],
    selectedBus: null,
    url: "https://orenburg.ru/activity/",
  };

  componentDidMount() {
    console.log("2 DidMount");
    //const puppeteer = require("puppeteer");

    async function fetchAndParse({ browserWSEndpoint, url }) {
      console.log(url);

      try {
        const browser = await puppeteer.connect({
          browserWSEndpoint,
        });

        const page = await browser.newPage();

        await page.setRequestInterception(true);
        page.on("request", (request) => {
          if (
            ["image", "stylesheet", "font", "script"].indexOf(
              request.resourceType()
            ) !== -1
          ) {
            request.abort();
          } else {
            request.continue();
          }
        });

        await page.goto(url, { waitUntil: "load", timeout: 0 });

        let data = await page.evaluate(
          () =>
            Array.from(
              document.querySelector("main").querySelectorAll("p")
            ).map((elem) => elem.innerHTML)
          //.join(",\n")
        );

        console.log(data);
        await page.close();
        await browser.close();

        return data;
      } catch (err) {
        console.error(err.message);
        return false;
      }
    }

    console.log("hren:" + this.props.id);

    if (this.props.num) {
      if (
        !this.state.selectedBus ||
        (this.state.selectedBus && this.state.selectedBus.id !== this.props.num)
      ) {
        console.log(this.props.id);
        const normUrl = `${this.state.url}` + `${this.props.id}`;
        fetchAndParse({
          browserWSEndpoint: "ws://127.0.0.1:4000",
          url: normUrl,
        }).then((p) => {
          return this.setState({ selectedBus: p });
        });
      }
    }
  }

  render() {
    let post = <p style={{ textAlign: "center" }}>Please select a Post!</p>;
    if (this.props.num) {
      post = <p style={{ textAlign: "center" }}>Loading...!</p>;
    }
    if (this.state.selectedBus) {
      const length = this.state.selectedBus.length;
      console.log("length = " + length);
      let polReisa = 0;
      let tudaObratno = [];
      for (let i = 0; i < length; i++) {
        if (/^\d/.test(this.state.selectedBus[i])) {
          tudaObratno[polReisa] = this.state.selectedBus[i];
          polReisa++;
        }
      }

      console.log("polReisa " + polReisa);
      console.log("tudaObratno " + tudaObratno);

      let count = 0;

      post = (
        <div>
          {polReisa > 0 ? (
            <div>
              <div>
                {console.log("[Bus.js] REturning..." + this.state.selectedBus)}
              </div>
              <h1>{this.props.num}</h1>
              <div>
                <div className="Bus">
                  <BusRoutes
                    polReisa={polReisa}
                    dir="tuda"
                    name={this.props.name}
                    tudaObratno={tudaObratno}
                  />
                  <BusRoutes
                    polReisa={polReisa}
                    dir="obratno"
                    name={this.props.name}
                    tudaObratno={tudaObratno}
                  />
                </div>
              </div>
            </div>
          ) : null}
        </div>
      );
    }

    return post;
  }
}

export default Bus;
