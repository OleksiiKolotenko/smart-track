import React from "react";
import "./Stuff.scss";
import StuffCard from "./StuffCard";

export const Stuff = () => {
  return (
    <div className="stuff">
      <div className="top">
        <button className="choice">Doctors</button>
        <button className="choice">Assistants</button>
        <button className="choice">Receptionist</button>
        <button className="stuff_add">Add new</button>
      </div>
      <div className="info_block">
        <StuffCard />
        <StuffCard />
        <StuffCard />
      </div>
    </div>
  );
};

export default Stuff;
