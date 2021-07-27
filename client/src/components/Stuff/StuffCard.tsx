import React, { FC, useState } from "react";
import { StuffT } from "../../graphql/Stuff/GetStuff";
import { ModalEditStuff } from "./Modals/ModalEditStuff";
import "./StuffCard.scss";
import blue from "../../img/blue.svg";
import edit from "../../img/editPen.svg";
import del from "../../img/trash.svg";

export const StuffCard: FC<StuffT> = ({
  number,
  id,
  name,
  email,
  phone,
  rooms,
}) => {
  const [modalEditStuff, setModalEditStuffActive] = useState(false);
  const toggleModal = () => {
    setModalEditStuffActive((store) => !store);
  };

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
      {rooms ? (
        <>
          <div className="colors">
            <img src={blue} alt="" />
            <img src={blue} alt="" />
            <img src={blue} alt="" />
            <img src={blue} alt="" />
            <img src={blue} alt="" />
          </div>
          <div className="rooms_list">
            Rooms:
            <span> {`${rooms} `}</span>
          </div>
        </>
      ) : (
        ""
      )}

      <div className="buttons">
        <button>
          <img src={edit} alt="" onClick={toggleModal} />
        </button>
        <button>
          <img src={del} alt="" />
        </button>
        {modalEditStuff && (
          <ModalEditStuff
            active={modalEditStuff}
            setModalEditStuffActive={setModalEditStuffActive}
          ></ModalEditStuff>
        )}
      </div>
    </div>
  );
};

export default StuffCard;
