import React from "react";
import "./StuffCard.scss";
import blue from "../../img/blue.svg";
import edit from "../../img/editPen.svg";
import del from "../../img/trash.svg";

export const StuffCard = () => {
  return (
    <div className="stuffCard">
      <div className="doctor_number">
        <span className="number">1</span>
      </div>
      <span className="name" style={{ marginRight: "80px" }}>
        Alex Sample
      </span>
      <span className="email" style={{ marginRight: "80px" }}>
        alexsample@gmail.com
      </span>
      <span className="phone" style={{ marginRight: "120px" }}>
        +38097973867
      </span>
      <div className="colors">
        <img src={blue} alt="" />
        <img src={blue} alt="" />
        <img src={blue} alt="" />
        <img src={blue} alt="" />
        <img src={blue} alt="" />
      </div>
      <div className="rooms_list">
        Rooms:
        <span> 1a, 1b, 3f</span>
      </div>
      <div className="buttons">
        <button>
          <img src={edit} alt="" />
        </button>
        <button>
          <img src={del} alt="" />
        </button>
      </div>
    </div>
  );
};

export default StuffCard;
