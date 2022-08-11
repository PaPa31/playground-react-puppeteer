import React, { Component } from "react";
import "./style.css";
import robot from "../../services/robot/index";
import data from "./orenburg-bus.json";

import { Spin, Form, Icon, Input, Button, Divider } from "antd";
const { Item } = Form;

class NormalLoginForm extends Component {
  state = {
    loading: false,
    comment: `Click "Get PTag" above ^^`,
    pTag: [],
    browserWSEndpoint: "no need",
    url: "orenburg-bus.json"
  };

  handleSubmit = e => {
    e.preventDefault();
    this.fetchPTag();
  };

  componentDidMount() {
    // this.fetchPTag();
  }

  fetchPTag = async () => {
    this.setState({ loading: true, comment: "Fetching..." });
    const { browserWSEndpoint, url } = this.state;
    if (this.state.loading) {
      alert("hi");
      const pTag = await robot({
        browserWSEndpoint,
        url
      });
    }
    this.setState({ comment: "Fetched", pTag: data, loading: false });
  };

  changeValue = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Item>
          <Input
            prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="No need"
            onChange={this.changeValue}
            value={this.state.browserWSEndpoint}
            name="browserWSEndpoint"
          />
        </Item>
        <Item>
          <Input
            prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="orenburg-bus.json"
            onChange={this.changeValue}
            value={this.state.url}
            name="url"
          />
        </Item>
        <Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Get PTag
          </Button>
        </Item>
        <Divider />
        <Item>
          <div>
            <Spin spinning={this.state.loading}>
              <b>PTag: </b>
              {this.state.comment}
              {this.state.comment == "Fetched" &&
                data.map((p, i) => {
                  return <p key={i}>{p.match(/\d{1,2}\.\d{2}/g)}</p>;
                })}
            </Spin>
          </div>
        </Item>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: "normal_login" })(
  NormalLoginForm
);

export default WrappedNormalLoginForm;
