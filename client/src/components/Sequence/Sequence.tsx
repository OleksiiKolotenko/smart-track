import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { SET_OWNER } from "../../graphql/Sequence/SetOwner";
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
import { GetByRole } from "../../graphql/Stuff/GetStuff";

export const Sequence = () => {
  const [currentDoctor, setCurrentDoctor] = useState<string | undefined>();

  const { data: dataRooms, loading: loadingRooms } =
    useQuery<GetAllSequenceResponse>(GetAllRooms);

  const { data: dataDoctors, loading: loadingDoctors } =
    useQuery<GetDoctorsByResponse>(getDoctors);

  const [setOwner] = useMutation(SET_OWNER);

  const [roomsCurrent, setRoomsCurrent] = useState({
    currentRooms: [],
  });
  const [roomsOther, setRoomsOther] = useState({
    otherRooms: [],
  });

  const currentDoctorId = dataDoctors?.getDoctors.find(
    (id) => id.name === currentDoctor
  )?.id;

  function setName() {
    roomsCurrent.currentRooms.filter((name: any) =>
      name.ownerName !== currentDoctor
        ? setOwner({
            variables: {
              id: name.id,
              ownerId: currentDoctorId,
              ownerName: currentDoctor,
            },
            refetchQueries: [
              { query: GetAllRooms },
              { query: getDoctors },
              { query: GetByRole, variables: { role: "Doctor" } },
            ],
          })
        : ""
    );
  }

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
        <button className="save" onClick={setName}>
          Save
        </button>
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
          roomsCurrent={roomsCurrent}
          setRoomsCurrent={setRoomsCurrent}
          roomsOther={roomsOther}
          setRoomsOther={setRoomsOther}
          dataRooms={dataRooms}
          currentDoctor={currentDoctor}
        ></SequenceDrag>
      </div>
    </div>
  );
};

export default Sequence;
