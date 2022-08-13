// @ts-check

import React, { Component } from "react";
import ReactDOM from "react-dom";

import "./index.css";
import Bus from "./components/Bus/Bus";

let buses = [];

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
    showBuses: [false, false, false, false],
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

    BUSES.buses.map((bus, index) => {
      console.log("id = " + id);
      console.log("bus.id = " + bus.id);
      if (id === bus.id) {
        console.log("Sovpalo");

        //const doesShow = !this.state.showBuses;

        const newShowBuses = [...this.state.showBuses];
        newShowBuses[index] = !this.state.showBuses[index];
        this.setState({ showBuses: newShowBuses }, function () {
          console.log("THIS " + this.state.showBuses);
        });

        if (newShowBuses[index]) {
          console.log("FUUGGG");
          buses[index] = bus;
        } else {
          buses[index] = null;
        }
        console.log(buses);
        //const newBuses = [...this.state.buses];
        //newBuses[index] = bus;
        this.setState({ buses: buses }, function () {
          console.log("THIS " + JSON.stringify(this.state.buses));
        });

        //const doesShow = true;
        //this.setState({ showBuses: doesShow });
      }
    });
  };

  noNull = (array) => {
    let j = 0;
    array.map((i) => (i ? j++ : null));
    return j;
  };

  render() {
    console.log("[Toggler/index.js] render");
    let _buses = null;
    let btnClass = null;

    //if (this.state.showBuses) {
    _buses = this.state.buses.map((bus, i) => {
      //console.log("BBUSS.NUMMM " + bus.num);
      //console.log(bus.id);
      return this.state.showBuses[i] ? (
        <Bus key={bus.id} id={bus.id} num={bus.num} name={bus.name} />
      ) : undefined;
    });

    //_buses = <Buses buses={this.state.buses} />;
    btnClass = "Red";
    //}

    console.log("this.state.buses.length = " + this.state.buses.length);

    const length = this.noNull(this.state.showBuses);
    console.log(length);

    const assignedClasses = [];
    if (length <= 2) {
      assignedClasses.push("red");
    }
    if (length <= 1) {
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
              className={this.state.showBuses[index] ? btnClass : undefined}
              onClick={() => {
                this.onlyBusesHandler(bus.id);
              }}
            >
              {bus.num}
            </button>
          );
        })}
        {_buses}
      </div>
    );
  }
}

ReactDOM.render(<Toggler />, document.getElementById("app"));
