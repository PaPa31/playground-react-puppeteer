import React, { Component } from "react";
import PolReisa from "../PolReisa/PolReisa";
import puppeteer from "../../../puppeteer";
import "./bus.css";

class Bus extends Component {
  state = {
    id: "",
    buses: [],
    selectedBus: null,
    url: "https://orenburg.ru/activity/",
  };

  //handleSaveToPC = (jsonData, filename) => {
  //  const fileData = JSON.stringify(jsonData);
  //  const blob = new Blob([fileData], { type: "text/plain" });
  //  const url = URL.createObjectURL(blob);
  //  const link = document.createElement("a");
  //  link.download = `${filename}.json`;
  //  link.href = url;
  //  link.click();
  //};

  componentDidMount() {
    console.log("2 DidMount");

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
            ).map((elem) => elem.innerText.trim())
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

    if (busic) {
      //this.handleSaveToPC(busic, "route-" + this.props.num);
      console.log("busic " + busic);
      const length = busic.length;
      console.log("length = " + length);
      let trip = 0;
      let tudaObratno = [[]];
      let mas = 0;
      tudaObratno[mas] = [];
      let firstTime = true;
      let footer = true;
      //debugger;
      for (let i = 0; i < length; i++) {
        // time
        if (/^\d{1,2}\.\d{2}$/.test(busic[i])) {
          if (firstTime) {
            firstTime = false;
          }
          // put in cell of the current Array
          tudaObratno[mas][trip] = busic[i];
          trip++;
          // save trip
          tudaObratno[mas][-1] = trip;
          // day
        } else if (/\d{1,2}\.\d{2}\.\d{2,4}/.test(busic[i])) {
          if (!firstTime) {
            firstTime = true;
            //  start a new Array
            mas++;
            trip = 0;
            tudaObratno[mas] = [];
          }
          // save main head
          tudaObratno[mas][-2] = busic[i];
          // holydays or not
        } else if (/Рабочие|Выходные/.test(busic[i])) {
          if (!firstTime) {
            firstTime = true;
            //  start a new Array
            mas++;
            trip = 0;
            tudaObratno[mas] = [];
          }
          // save secondary head
          tudaObratno[mas][-3] = busic[i];
          // carrier info
        } else if (/Перевозчик/.test(busic[i])) {
          //firstTime = true;
          if (footer) {
            footer = false;
            // save footer
            tudaObratno[0][-4] = busic[i];
          }
        }
      }

      console.log("tudaObratno " + tudaObratno.map((i) => i));

      post = (
        <div className="Main">
          <h1>{this.props.num}</h1>
          <div className="Head">
            {tudaObratno[0][-2] ? <h2>{tudaObratno[0][-2]}</h2> : null}
            {tudaObratno.map((i) => (
              <div
                className="subHead"
                style={
                  this.props.there && this.props.from
                    ? { width: "10.3em" }
                    : { width: "5.1em" }
                }
              >
                {i[-2] && !tudaObratno[0][-2] ? <h2>{i[-2]}</h2> : null}
                {i[-3] ? <h3>{i[-3]}</h3> : null}
                <PolReisa
                  trip={i[-1]}
                  dir="tuda"
                  name={this.props.name}
                  tudaObratno={i}
                  holiday={i[-3]}
                  there={this.props.there}
                />
                <PolReisa
                  trip={i[-1]}
                  dir="obratno"
                  name={this.props.name}
                  tudaObratno={i}
                  holiday={i[-3]}
                  from={this.props.from}
                />
              </div>
            ))}
          </div>
          {tudaObratno[0][-4] ? (
            <h4 className="subFooter">{tudaObratno[0][-4]}</h4>
          ) : null}
        </div>
      );
    }

    return post;
  }
}

export default Bus;
