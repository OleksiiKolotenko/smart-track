import React, { FC } from "react";
import "./StuffCard.scss";
import blue from "../../img/blue.svg";
import edit from "../../img/editPen.svg";
import del from "../../img/trash.svg";
import { StuffT } from "../../graphql/Stuff/GetStuff";

export const StuffCard: FC<StuffT> = ({ number, id, name, email, phone }) => {
  return (
    <div className="stuffCard">
      <div className="doctor_id">
        <span className="id">{number}</span>
      </div>
      <span className="name" style={{ marginRight: "80px" }}>
        {name}
      </span>
      <span className="email" style={{ marginRight: "80px" }}>
        {email}
      </span>
      <span className="phone" style={{ marginRight: "120px" }}>
        {`+${phone}`}
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
