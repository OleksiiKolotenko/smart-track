import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useQuery } from "@apollo/client";

import {
  GetAllRooms,
  GetAllSequenceResponse,
} from "../../graphql/Sequence/GetRooms";
import {
  getDoctors,
  GetDoctorsByResponse,
} from "../../graphql/Sequence/GetDoctors";
import { ModalCreateRoom } from "./Modal/ModalCreateRoom";
import add from "../../img/add.svg";
import plus from "../../img/plus.svg";
import "./Sequence.scss";
import { SequenceActiveDoctor } from "./SequenceActiveDoctor";
import { SequenceOtherRooms } from "./SequenceOtherRooms";

export const Sequence = () => {
  const [modalCreateRoom, setModalCreateRoomActive] = useState(false);
  const [currentDoctor, setCurrentDoctor] = useState<string | undefined>();

  const toggleCreateModal = () => {
    setModalCreateRoomActive((store) => !store);
  };

  const { data: dataRooms, loading: loadingRooms } =
    useQuery<GetAllSequenceResponse>(GetAllRooms);

  const { data: dataDoctors, loading: loadingDoctors } =
    useQuery<GetDoctorsByResponse>(getDoctors);

  useEffect(() => {
    if (dataDoctors) {
      setCurrentDoctor(dataDoctors.getDoctors[0].name);
    }
  }, [dataDoctors]);

  if (loadingRooms) {
    return <span>Page is loading...</span>;
  }

  if (loadingDoctors) {
    return <span>Page is loading...</span>;
  }

  return (
    <div className="sequence">
      <div className="top">
        <span style={{ fontSize: "18px" }}>Choose a Doctor</span>
        <button className="save">Save</button>
      </div>
      <div className="doctor">
        <select
          style={{ fontSize: "18px" }}
          onChange={(e) => {
            setCurrentDoctor(e.currentTarget.value);
          }}
        >
          {dataDoctors?.getDoctors &&
            dataDoctors.getDoctors.map((sequence_doctor, index) => (
              <option key={`sequence_${index}`}>{sequence_doctor.name}</option>
            ))}
        </select>
      </div>

      <h1>Drag and Drop rooms to the box</h1>

      <div className="drag_in">
        <SequenceActiveDoctor
          dataRooms={dataRooms}
          currentDoctor={currentDoctor}
        ></SequenceActiveDoctor>
      </div>
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
        <SequenceOtherRooms
          dataRooms={dataRooms}
          currentDoctor={currentDoctor}
        ></SequenceOtherRooms>
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
