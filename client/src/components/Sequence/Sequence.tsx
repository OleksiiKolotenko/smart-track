import React from "react";
import "./Sequence.scss";
import SequenceCard from "./SequenceCard";
import triangle from "../../img/triangle.svg";
import add from "../../img/add.svg";
import plus from "../../img/plus.svg";

export const Sequence = () => {
  return (
    <div className="sequence">
      <div className="top">
        <span style={{ fontSize: "18px" }}>Choose a Doctor</span>
        <button className="save">Save</button>
      </div>
      <div className="doctor">
        <span className="doctor_name">Alex Sample</span>
        <img src={triangle} alt="" />
      </div>
      <h1>Drag and Drop rooms to the box</h1>
      <div className="drag_in"></div>
      <h2
        style={{ paddingTop: "40px", fontSize: "18px", paddingBottom: "40px" }}
      >
        Drag and Drop rooms to the box
      </h2>
      <div className="rooms">
        <div className="rooms_creation_block">
          <div className="add_block">
            <img src={add} alt="addCreate" className="addCreate" />
            <img
              src={plus}
              alt="addPlus"
              className="addPlus"
              style={{ marginLeft: "-29px" }}
            />
          </div>
          <span className="create">Add a room</span>
        </div>
        <SequenceCard />
      </div>
    </div>
  );
};

export default Sequence;
