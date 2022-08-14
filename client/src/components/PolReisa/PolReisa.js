import React from "react";
import "./PolReisa.css";

const busRoutes = (props) => {
  function ShowTime({ p }) {
    return (
      <tr>
        <td>{p}</td>
      </tr>
    );
  }

  return (
    <div className="BusRoutes">
      {props.trip > 0 && props.dir === "tuda" ? (
        <h4>{props.name}:</h4>
      ) : (
        <h4>Сады:</h4>
      )}
      <table>
        <tbody>
          {props.trip > 0 && props.dir === "tuda"
            ? props.tudaObratno.map((p, id) =>
                id < props.trip / 2 ? <ShowTime key={id} p={p} /> : null
              )
            : props.tudaObratno.map((p, id) =>
                id >= props.trip / 2 ? <ShowTime key={id} p={p} /> : null
              )}
        </tbody>
      </table>
    </div>
  );
};

export default React.memo(busRoutes);
