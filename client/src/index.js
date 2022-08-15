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
    selectBuses: [false, false, false, false],
    changeCounter: 0,
    showThere: true,
    showFrom: true,
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

        const newSelectBuses = [...this.state.selectBuses];
        newSelectBuses[index] = !this.state.selectBuses[index];
        this.setState({ selectBuses: newSelectBuses }, function () {
          console.log("THIS " + this.state.selectBuses);
        });

        if (newSelectBuses[index]) {
          console.log("FUUGGG");
          buses[index] = bus;
        } else {
          buses[index] = null;
        }
        console.log(buses);

        this.setState({ buses: buses }, function () {
          console.log("THIS " + JSON.stringify(this.state.buses));
        });
      }
    });
  };

  noNull = (array) => {
    let j = 0;
    array.map((i) => (i ? j++ : null));
    return j;
  };

  toggleColumnHandler = (dir) => {
    if (dir === "showThere") {
      const doesShow = this.state.showFrom;
      this.setState({ showFrom: !doesShow });
    } else {
      const doesShow = this.state.showThere;
      this.setState({ showThere: !doesShow });
    }
  };

  render() {
    console.log("[Toggler/index.js] render");
    let _buses = null;
    let btnClass = null;
    let btnMess;

    //if (this.state.showBuses) {
    _buses = this.state.buses.map((bus, i) => {
      //console.log("BBUSS.NUMMM " + bus.num);
      //console.log(bus.id);
      return this.state.selectBuses[i] ? (
        <Bus
          key={bus.id}
          id={bus.id}
          num={bus.num}
          name={bus.name}
          there={this.state.showThere}
          from={this.state.showFrom}
        />
      ) : undefined;
    });

    //_buses = <Buses buses={this.state.buses} />;
    btnClass = "Red";
    //}

    console.log("this.state.buses.length = " + this.state.buses.length);

    const length = this.noNull(this.state.selectBuses);
    console.log(length);

    const assignedClasses = [];
    if (length <= 2) {
      assignedClasses.push("red");
    }
    if (length <= 1) {
      assignedClasses.push("bold");
    }

    if (length == 2) {
      btnMess = "Кликните заголовки только нужных колонок";
    }
    if (length == 1) {
      btnMess = "Добавьте маршрут для сравнения:";
    }
    if (length == 0) {
      btnMess = "Выберите маршрут:";
    }

    return (
      <div className="Toggler">
        <h1>Da4aBus</h1>
        <p className={assignedClasses.join(" ")}>{btnMess}</p>
        <div className="Button">
          {BUSES.buses.map((bus, index) => {
            return (
              <button
                key={index}
                className={this.state.selectBuses[index] ? btnClass : undefined}
                onClick={() => {
                  this.onlyBusesHandler(bus.id);
                }}
              >
                {bus.num}
              </button>
            );
          })}
        </div>
        {length > 0 && (
          <div className="TwoButtons">
            {this.state.showThere && (
              <button onClick={() => this.toggleColumnHandler("showThere")}>
                {this.state.showFrom ? "Из города" : "Вернуть"}
              </button>
            )}
            {this.state.showFrom && (
              <button onClick={() => this.toggleColumnHandler("showFrom")}>
                {this.state.showThere ? "Из садов" : "Вернуть"}
              </button>
            )}
          </div>
        )}
        <div className="Buses">{_buses}</div>
      </div>
    );
  }
}

ReactDOM.render(<Toggler />, document.getElementById("app"));
