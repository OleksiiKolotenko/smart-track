import _ from "lodash";

import SequenceCard from "./SequenceCard";
import { DragDropContext, Droppable, Draggable } from "aligned-rbd";
import { useState, useEffect, SetStateAction } from "react";
import add from "../../img/add.svg";
import plus from "../../img/plus.svg";
import { ModalCreateRoom } from "./Modal/ModalCreateRoom";
import {
  GetAllSequenceResponse,
  SequenceT,
} from "../../graphql/Sequence/GetRooms";
import { ICurrentRooms, IOtherRooms } from "./Sequence";

interface SequenceDrag {
  dataRooms: GetAllSequenceResponse;
  currentDoctor: string | undefined;
  setRoomsCurrent: React.Dispatch<SetStateAction<any>>;
  setRoomsOther: React.Dispatch<SetStateAction<any>>;
  roomsCurrent: ICurrentRooms;
  roomsOther: IOtherRooms;
}

export const SequenceDrag: React.FC<SequenceDrag> = ({
  dataRooms,
  currentDoctor,
  roomsCurrent,
  roomsOther,
  setRoomsCurrent,
  setRoomsOther,
}) => {
  const [modalCreateRoom, setModalCreateRoomActive] = useState(false);

  const toggleCreateModal = () => {
    if (!currentDoctor) {
      setModalCreateRoomActive(false);
    } else setModalCreateRoomActive((store) => !store);
  };

  const allRooms = { roomsCurrent, roomsOther };

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list.otherRooms || list.currentRooms);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const move = (list, startIndex, endIndex) => {
    const newStart: SequenceT[] = Array.from(
      list.otherRooms || list.currentRooms
    );
    const [taken] = newStart.splice(startIndex, 1);

    return { newStart, taken };
  };

  const idList = {
    active_sequence: "roomsCurrent",
    other_sequence: "roomsOther",
  };

  const getList = (id: number) => allRooms[idList[id]];

  function onDragEnd(result) {
    const { source, destination } = result;

    if (!result.destination) {
      return;
    }

    if (getList(source.droppableId) === getList(destination.droppableId)) {
      const items = reorder(
        getList(source.droppableId),
        source.index,
        destination.index
      );

      if (source.droppableId === "other_sequence") {
        setRoomsOther({ otherRooms: items });
      } else setRoomsCurrent({ currentRooms: items });
    } else {
      const items = move(
        getList(source.droppableId),
        source.index,
        destination.index
      );

      if (source.droppableId === "active_sequence") {
        const copyOther = [...roomsOther.otherRooms];
        copyOther.splice(destination.index, 0, items.taken);

        setRoomsCurrent({ currentRooms: items.newStart });
        setRoomsOther({
          otherRooms: copyOther,
        });
      } else {
        const copyCurrent = [...roomsCurrent.currentRooms];
        copyCurrent.splice(destination.index, 0, items.taken);

        setRoomsOther({ otherRooms: items.newStart });
        setRoomsCurrent({
          currentRooms: copyCurrent,
        });
      }
    }
  }

  useEffect(() => {
    if (currentDoctor) {
      setRoomsCurrent({
        currentRooms: dataRooms?.getRooms.filter(
          (room) => room.ownerName === currentDoctor
        ),
      });
      setRoomsOther({
        otherRooms: dataRooms?.getRooms.filter(
          (room) => room.ownerName !== currentDoctor
        ),
      });
    }
  }, [currentDoctor, dataRooms]);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="drag_in">
        <Droppable droppableId="active_sequence" direction="grid">
          {(provided) => (
            <div
              className="active_cards"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {roomsCurrent &&
                roomsCurrent.currentRooms.map((sequence, index) => (
                  <Draggable
                    draggableId={sequence.name}
                    key={sequence.name}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        className="active_cards"
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        <SequenceCard
                          name={sequence.name}
                          key={`sequence_${index}`}
                          id={sequence.id}
                          ownerId={sequence.ownerId}
                          ownerName={sequence.ownerName}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
      <h2
        style={{
          paddingTop: "40px",
          fontSize: "18px",
          paddingBottom: "40px",
        }}
      >
        Drag and Drop rooms to the box
      </h2>
      <div className="drag_in_lower">
        <div className="rooms">
          <div
            className="rooms_creation_block"
            onClick={toggleCreateModal}
            style={{ cursor: "pointer" }}
          >
            <div
              className="add_block"
              style={
                currentDoctor
                  ? { cursor: "pointer" }
                  : { cursor: "not-allowed", opacity: "0.7" }
              }
            >
              <img src={add} alt="addCreate" className="addCreate" />
              <img
                src={plus}
                alt="addPlus"
                className="addPlus"
                style={{ marginLeft: "-29px" }}
              />
            </div>
            <span className={currentDoctor ? "create" : "create_disabled"}>
              Add a room
            </span>
          </div>
          <Droppable droppableId="other_sequence" direction="grid">
            {(provided) => (
              <div
                className="cards"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <div className="cards_inside">
                  {roomsOther &&
                    roomsOther.otherRooms.map((sequence, index) => (
                      <Draggable
                        draggableId={sequence.id}
                        key={sequence.name}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            className="active_cards"
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                          >
                            <SequenceCard
                              name={sequence.name}
                              key={`sequence_${index}`}
                              id={sequence.id}
                              ownerId={sequence.ownerId}
                              ownerName={sequence.ownerName}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                </div>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </div>

      {!currentDoctor
        ? () => setModalCreateRoomActive(false)
        : modalCreateRoom && (
            <ModalCreateRoom
              active={modalCreateRoom}
              setModalCreateRoomActive={setModalCreateRoomActive}
            ></ModalCreateRoom>
          )}
    </DragDropContext>
  );
};
