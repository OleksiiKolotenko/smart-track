import React, { useState } from "react";
import SequenceCard from "./SequenceCard";
import {
  GetAllRooms,
  GetAllSequenceResponse,
} from "../../graphql/Sequence/GetRooms";
import "./Sequence.scss";
import triangle from "../../img/triangle.svg";
import add from "../../img/add.svg";
import plus from "../../img/plus.svg";
import { useQuery } from "@apollo/client";
import { ModalCreateRoom } from "./Modal/ModalCreateRoom";

export const Sequence = () => {
  const [modalCreateRoom, setModalCreateRoomActive] = useState(false);

  const toggleCreateModal = () => {
    setModalCreateRoomActive((store) => !store);
  };

  const { data, loading } = useQuery<GetAllSequenceResponse>(GetAllRooms);

  if (loading) {
    return <span>Page is loading...</span>;
  }

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
        <div
          className="rooms_creation_block"
          onClick={toggleCreateModal}
          style={{ cursor: "pointer" }}
        >
          <div className="add_block" style={{ cursor: "pointer" }}>
            <img src={add} alt="addCreate" className="addCreate" />
            <img
              src={plus}
              alt="addPlus"
              className="addPlus"
              style={{ marginLeft: "-29px" }}
            />
          </div>
          <span className="create" style={{ cursor: "pointer" }}>
            Add a room
          </span>
        </div>
        <div className="cards">
          {data?.getRooms &&
            data.getRooms.map((sequence, index) => (
              <SequenceCard
                name={sequence.name}
                key={`sequence_${index}`}
                id={sequence.id}
                owner={sequence.owner}
                ownerName={sequence.ownerName}
              />
            ))}
        </div>
      </div>
      {modalCreateRoom && (
        <ModalCreateRoom
          active={modalCreateRoom}
          setModalCreateRoomActive={setModalCreateRoomActive}
        ></ModalCreateRoom>
      )}
    </div>
  );
};

export default Sequence;
