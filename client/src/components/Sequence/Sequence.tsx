import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { SET_OWNER } from "../../graphql/Sequence/SetOwner";
import { CLEAR_OWNER } from "../../graphql/Sequence/ClearOwner";
import {
  GetAllRooms,
  GetAllSequenceResponse,
  SequenceT,
} from "../../graphql/Sequence/GetRooms";
import {
  getDoctors,
  GetDoctorsByResponse,
} from "../../graphql/Sequence/GetDoctors";

import "./Sequence.scss";
import { SequenceDrag } from "./SequenceDrag";
import { GetByRole } from "../../graphql/Stuff/GetStuff";

export interface ICurrentRooms {
  currentRooms: SequenceT[];
}

export interface IOtherRooms {
  otherRooms: SequenceT[];
}

export const Sequence = () => {
  const [currentDoctor, setCurrentDoctor] = useState<string | undefined>();

  const { data: dataRooms, loading: loadingRooms } =
    useQuery<GetAllSequenceResponse>(GetAllRooms);

  const { data: dataDoctors, loading: loadingDoctors } =
    useQuery<GetDoctorsByResponse>(getDoctors);

  const [setOwner] = useMutation(SET_OWNER);

  const [clearOwner] = useMutation(CLEAR_OWNER);

  const [roomsCurrent, setRoomsCurrent] = useState<ICurrentRooms>({
    currentRooms: [],
  });

  const [roomsOther, setRoomsOther] = useState<IOtherRooms | any>({
    otherRooms: dataRooms?.getRooms,
  });

  const currentDoctorId = dataDoctors?.getDoctors.find(
    (id) => id.name === currentDoctor
  )?.id;

  useEffect(() => {
    if (!currentDoctor) {
      setRoomsOther({
        otherRooms: dataRooms?.getRooms,
      });
    }
  }, [dataRooms]);

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

  function clearName() {
    roomsOther.otherRooms.filter((name: any) =>
      name.ownerName === currentDoctor
        ? clearOwner({
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

  if (loadingRooms) {
    return <span>Page is loading...</span>;
  }

  if (loadingDoctors) {
    return <span>Page is loading...</span>;
  }

  function handleSave() {
    if (currentDoctor) {
      return setName(), clearName();
    } else window.alert("You should pick a doctor first!");
  }

  return (
    <div className="sequence">
      <div className="top">
        <span style={{ fontSize: "18px" }}>Choose a Doctor</span>
        <button
          className={currentDoctor ? "save" : "save_disabled"}
          onClick={handleSave}
        >
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
          <option hidden>Make a choice</option>
          {dataDoctors?.getDoctors &&
            dataDoctors.getDoctors.map((sequence_doctor, index) => (
              <>
                <option key={`sequence_${index}`}>
                  {sequence_doctor.name}
                </option>
              </>
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
