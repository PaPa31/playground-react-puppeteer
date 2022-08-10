import React, { Component } from "react";
import ReactDOM from "react-dom";
import robot from "./robot";

class App extends Component {
  state = {
    pTag: "",
    browserWSEndpoint: "ws://127.0.0.1:4000",
    url: "https://orenburg.ru/activity/16280/"
  };
  componentDidMount() {
    // this.fetchPTag();
  }
  fetchPTag = async () => {
    const { browserWSEndpoint, url } = this.state;
    const pTag = await robot({
      browserWSEndpoint,
      url
    });
    this.setState({ pTag });
  };
  changeValue = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  render() {
    return (
      <div>
        <div className="container">
          <input
            onChange={this.changeValue}
            value={this.state.browserWSEndpoint}
            name="browserWSEndpoint"
          />
          <input
            onChange={this.changeValue}
            value={this.state.url}
            name="url"
          />
          <button onClick={this.fetchPTag}>Get pTag</button>
          <div>{this.state.pTag}</div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
