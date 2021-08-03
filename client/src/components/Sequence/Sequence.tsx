import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import {
  GetAllRooms,
  GetAllSequenceResponse,
} from "../../graphql/Sequence/GetRooms";
import {
  getDoctors,
  GetDoctorsByResponse,
} from "../../graphql/Sequence/GetDoctors";

import "./Sequence.scss";
import { SequenceDrag } from "./SequenceDrag";

export const Sequence = () => {
  const [currentDoctor, setCurrentDoctor] = useState<string | undefined>();

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

      <div className="drag">
        <SequenceDrag
          dataRooms={dataRooms}
          currentDoctor={currentDoctor}
        ></SequenceDrag>
      </div>
    </div>
  );
};

export default Sequence;
