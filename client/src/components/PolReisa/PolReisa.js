import React, { Component } from "react";
import "./PolReisa.css";
import Time from "../Time/time";

class busRoutes extends Component {
  state = {
    showThere: true,
    showFrom: true,
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
    return (
      <div>
        {this.state.showColumn && (
          <div className="BusRoutes">
            {this.props.trip > 0 && this.props.dir === "tuda" ? (
              <h4 onClick={this.toggleColumnHandler("showFrom")}>
                {this.props.name}:
              </h4>
            ) : (
              <h4 onClick={this.toggleColumnHandler("showThere")}>Сады:</h4>
            )}
            <table>
              <tbody>
                {this.props.trip > 0 && this.props.dir === "tuda"
                  ? this.props.tudaObratno.map((p, id) =>
                      id < this.props.trip / 2 ? <Time key={id} p={p} /> : null
                    )
                  : this.props.tudaObratno.map((p, id) =>
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
