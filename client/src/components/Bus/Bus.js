import React, { Component } from "react";
import "./bus.css";
import trip from "../trip/trip";
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

        //await page.setRequestInterception(true);
        //page.on("request", (request) => {
        //  if (
        //    ["image", "stylesheet", "font", "script"].indexOf(
        //      request.resourceType()
        //    ) !== -1
        //  ) {
        //    request.abort();
        //  } else {
        //    request.continue();
        //  }
        //});

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

    const b = this.state.selectedBus;

    if (this.props.num) {
      if (!b || (b && b.id !== this.props.num)) {
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
    let post = <p>Please select a bus route!</p>;
    if (this.props.num) {
      post = <p>Loading...!</p>;
    }

    const busic = this.state.selectedBus;
    console.log("busic " + busic);

    if (busic) {
      const length = busic.length;
      console.log("length = " + length);
      let trip = 0;
      let tudaObratno = [[]];
      let mas = -1;
      let firstTime = true;
      //let timeFirst = true;
      //let noTimeFirst = true;
      let footer = true;
      for (let i = 0; i < length; i++) {
        //p.match(/\d{1,2}\.\d{2}/g);
        if (/\d{1,2}\.\d{2}/.test(busic[i])) {
          if (firstTime) {
            firstTime = false;
            //  start a new Array
            mas++;
            trip = 0;
            tudaObratno[mas] = [];
          }
          // put in cell of the current Array
          tudaObratno[mas][trip] = busic[i];
          trip++;
          // save trip
          tudaObratno[mas][-1] = trip;
        } else if (/\d{1,2}\.\d{2}\.\d{2,4}/.test(busic[i])) {
          if (firstTime) {
            firstTime = false;
            //  start a new Array
            mas++;
            trip = 0;
            tudaObratno[mas] = [];
          }
          //save main head
          tudaObratno[mas][-2] = busic[i];
        } else if (/[Рабочие|Выходные]/.test(busic[i])) {
          if (firstTime) {
            firstTime = false;
            //  start a new Array
            mas++;
            trip = 0;
            tudaObratno[mas] = [];
          }
          // save secondary head
          tudaObratno[mas][-3] = busic[i];
        } else if (/Перевозчик/.test(busic[i])) {
          firstTime = true;
          if (footer) {
            footer = false;
            // save footer
            tudaObratno[mas][-4] = busic[i];
          }
        }

        //if (
        //  (/\d{1,2}\.\d{2}\.\d{2,4}/.test(busic[i]) ||
        //    /[Рабочие|Выходные]/.test(busic[i]) ||
        //    /\d{1,2}\.\d{2}/.test(busic[i])) &&
        //  firstTime
        //) {
        //  firstTime = false;
        //  tudaObratno[0][trip] = busic[i];
        //  trip++;
        //}
      }

      console.log("trip " + trip);
      console.log("tudaObratno " + tudaObratno);

      let count = 0;

      post = (
        <div>
          {trip > 0 ? (
            <div>
              <div>{console.log("[Bus.js] REturning..." + busic)}</div>
              <h1>{this.props.num}</h1>
              <div>
                <div className="Bus">
                  <trip
                    trip={trip}
                    dir="tuda"
                    name={this.props.name}
                    tudaObratno={tudaObratno}
                  />
                  <trip
                    trip={trip}
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
