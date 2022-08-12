// @ts-check

import React, { Component } from "react";
import ReactDOM from "react-dom";

import "./index.css";
import Buses from "./components/Buses/Buses";

const BUSES = {
  buses: [
    { id: "16279", name: "Клиффорд", num: 296 },
    { id: "16280", name: "РТИ", num: 297 },
    { id: "16247", name: "Клиффорд", num: 100 },
    { id: "16248", name: "Клиффорд", num: 110 },
  ],
};

class Toggler extends Component {
  constructor(props) {
    super(props);
    console.log("[Toggler/index.js] constructor");
  }
  state = {
    buses: [],
    showBuses: false,
    changeCounter: 0,
  };

  static getDerivedStateFromProps(props, state) {
    console.log("[Toggler/index.js] getDerivedStateFromProps", props);
    return state;
  }

  componentDidMount() {
    console.log("[Toggler/index.js] componentDidMount");
  }

  onlyBusesHandler = (id) => {
    console.log("Hi");
    const buses = [];
    BUSES.buses.map((bus, index) => {
      console.log("id = " + id);
      console.log("bus.id = " + bus.id);
      if (id === bus.id) {
        console.log("Sovpalo");
        buses[index] = bus;
        console.log(buses);
      }
    });

    this.setState({ buses: buses });

    const doesShow = true;
    this.setState({ showBuses: doesShow });
  };

  render() {
    console.log("[Toggler/index.js] render");
    let buses = null;
    let btnClass = null;

    if (this.state.showBuses) {
      buses = <Buses buses={this.state.buses} />;
      btnClass = "Red";
    }

    const assignedClasses = [];
    if (this.state.buses.length <= 2) {
      assignedClasses.push("red");
    }
    if (this.state.buses.length <= 1) {
      assignedClasses.push("bold");
    }

    return (
      <div className="Toggler">
        <h1>Da4aBus</h1>
        <p className={assignedClasses.join(" ")}>Выберите маршрут:</p>
        {BUSES.buses.map((bus, index) => {
          return (
            <button
              key={index}
              className={btnClass}
              onClick={() => {
                this.onlyBusesHandler(bus.id);
              }}
            >
              {bus.num}
            </button>
          );
        })}
        {buses}
      </div>
    );
  }
}

ReactDOM.render(<Toggler />, document.getElementById("app"));
