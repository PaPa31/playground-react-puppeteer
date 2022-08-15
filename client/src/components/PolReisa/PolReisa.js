import React, { Component } from "react";
import "./PolReisa.css";
import Time from "../Time/time";

class busRoutes extends Component {
  render() {
    return (
      <div className="One">
        {this.props.dir === "tuda" ? (
          <div
            className="BusRoutes"
            style={this.props.there ? {} : { display: "none" }}
          >
            <h4>{this.props.name}:</h4>
            <table>
              <tbody>
                {this.props.tudaObratno.map((p, id) =>
                  id < this.props.trip / 2 ? <Time key={id} p={p} /> : null
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div
            className="BusRoutes"
            style={this.props.from ? {} : { display: "none" }}
          >
            <h4>Сады:</h4>
            <table>
              <tbody>
                {this.props.tudaObratno.map((p, id) =>
                  id >= this.props.trip / 2 ? <Time key={id} p={p} /> : null
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }
}

export default busRoutes;
