import SequenceCard from "./SequenceCard";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useState, useEffect } from "react";
import add from "../../img/add.svg";
import plus from "../../img/plus.svg";
import { ModalCreateRoom } from "./Modal/ModalCreateRoom";
import { Source } from "graphql";

export const SequenceDrag = ({ dataRooms, currentDoctor }) => {
  const [modalCreateRoom, setModalCreateRoomActive] = useState(false);

  const toggleCreateModal = () => {
    setModalCreateRoomActive((store) => !store);
  };

  const [roomsCurrent, setRoomsCurrent] = useState({
    currentRooms: dataRooms?.getRooms.filter(
      (room) => room.ownerName === currentDoctor
    ),
  });

  const [roomsOther, setRoomsOther] = useState({
    otherRooms: dataRooms?.getRooms.filter(
      (room) => room.ownerName != currentDoctor
    ),
  });

  const allRooms = { roomsCurrent, roomsOther };

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list.otherRooms || list.currentRooms);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    console.log(removed);

    return result;
  };

  const move = (list, startIndex, endIndex) => {
    const newStart = Array.from(list.otherRooms || list.currentRooms);
    const [taken] = newStart.splice(startIndex, 1);
    const resultStart = {
      newStart,
    };
    console.log("Array without taken element", newStart);
    console.log("Taken element:", taken);

    const resultEnd = taken;

    console.log("Item will be pushed:", endIndex);

    return { newStart, resultEnd };
  };

  const idList = {
    active_sequence: "roomsCurrent",
    other_sequence: "roomsOther",
  };

  const getList = (id) => allRooms[idList[id]];

  function onDragEnd(result) {
    const { source, destination } = result;
    console.log("source", source.droppableId);

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
      if (source.droppableId === "other_sequence") {
        setRoomsOther({ otherRooms: items });
      } else setRoomsCurrent({ currentRooms: items });
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
        <Droppable droppableId="active_sequence" direction="horizontal">
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
          <Droppable droppableId="other_sequence" direction="horizontal">
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
      {modalCreateRoom && (
        <ModalCreateRoom
          active={modalCreateRoom}
          setModalCreateRoomActive={setModalCreateRoomActive}
        ></ModalCreateRoom>
      )}
    </DragDropContext>
  );
};
