import React, { useState } from "react";
import { ModalEditRoom } from "./Modal/ModalEditRoom";
import { ModalDeleteRoom } from "./Modal/ModalDeleteRoom";
import { SequenceT } from "../../graphql/Sequence/GetRooms";

import "./SequenceCard.scss";
import add from "../../img/add.svg";
import del from "../../img/delete.svg";
import edit from "../../img/editPen.svg";

export const SequenceCard: React.FC<SequenceT> = ({
  name,
  id,
  ownerId,
  ownerName,
}) => {
  const [modalEditRoom, setModalEditRoomActive] = useState(false);

  const toggleEditModal = () => {
    setModalEditRoomActive((store) => !store);
  };

  const [modalDeleteRoom, setModalDeleteRoomActive] = useState(false);

  const toggleDeleteModal = () => {
    setModalDeleteRoomActive((store) => !store);
  };

  return (
    <div className="sequence_card">
      <div className="buttons">
        <img
          src={del}
          alt="delete_item"
          onClick={toggleDeleteModal}
          style={{ cursor: "pointer" }}
        />
        <img
          src={edit}
          alt="edit_item"
          onClick={toggleEditModal}
          style={{ cursor: "pointer" }}
        />
      </div>
      <div className="room_number">
        <img src={add} alt="" />
        <span className="number">{name}</span>
      </div>
      <span className="name">{ownerName}</span>
      {modalEditRoom && (
        <ModalEditRoom
          id={id}
          ownerId={ownerId}
          ownerName={ownerName}
          active={modalEditRoom}
          setModalEditRoomActive={setModalEditRoomActive}
        ></ModalEditRoom>
      )}
      {modalDeleteRoom && (
        <ModalDeleteRoom
          id={id}
          active={modalDeleteRoom}
          setModalDeleteRoomActive={setModalDeleteRoomActive}
        ></ModalDeleteRoom>
      )}
    </div>
  );
};

export default SequenceCard;
