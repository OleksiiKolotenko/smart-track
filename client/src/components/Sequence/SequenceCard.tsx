import React from "react";
import "./SequenceCard.scss";
import add from "../../img/add.svg";
import del from "../../img/delete.svg";
import edit from "../../img/editPen.svg";

export const SequenceCard = ({ name }) => {
  return (
    <div className="sequence_card">
      <div className="buttons">
        <img src={del} alt="" />
        <img src={edit} alt="" />
      </div>
      <div className="room_number">
        <img src={add} alt="" />
        <span className="number">{name}</span>
      </div>
      <span className="name">Alex Sample</span>
    </div>
  );
};

export default SequenceCard;
