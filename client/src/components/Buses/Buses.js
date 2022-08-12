import React from "react";
import Bus from "../Bus/Bus";

const buses = (props) => {
  console.log("[Buses.js] rendering...");
  return props.buses.map((bus) => {
    console.log(bus.num);
    console.log(bus.id);
    return <Bus key={bus.id} id={bus.id} num={bus.num} name={bus.name} />;
  });
};
export default buses;
