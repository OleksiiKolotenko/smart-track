import SequenceCard from "./SequenceCard";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useState, useEffect } from "react";
import add from "../../img/add.svg";
import plus from "../../img/plus.svg";
import { ModalCreateRoom } from "./Modal/ModalCreateRoom";

export const SequenceDrag = ({ dataRooms, currentDoctor }) => {
  const [modalCreateRoom, setModalCreateRoomActive] = useState(false);
  const toggleCreateModal = () => {
    setModalCreateRoomActive((store) => !store);
  };
  const [roomsPlace, setRoomsPlace] = useState(dataRooms?.getRooms);
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  function handleOnDragEnd(result) {
    if (!result.destination) {
      return;
    }
    const items = reorder(
      roomsPlace,
      result.source.index,
      result.destination.index
    );

    setRoomsPlace(items);
  }

  useEffect(() => {
    setRoomsPlace(dataRooms?.getRooms);
  }, [dataRooms]);

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div className="drag_in">
        <Droppable droppableId="active_sequence" direction="horizontal">
          {(provided) => (
            <div
              className="active_cards"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {roomsPlace &&
                roomsPlace.map((sequence, index) => {
                  return (
                    <Draggable
                      key={sequence.name}
                      draggableId={sequence.name}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          className="active_div"
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                        >
                          {sequence.ownerName === currentDoctor ? (
                            <SequenceCard
                              name={sequence.name}
                              key={`sequence_${index}`}
                              id={sequence.id}
                              ownerId={sequence.ownerId}
                              ownerName={sequence.ownerName}
                            />
                          ) : (
                            ""
                          )}
                        </div>
                      )}
                    </Draggable>
                  );
                })}{" "}
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
                  {roomsPlace &&
                    roomsPlace.map((sequence, index) => {
                      return (
                        <Draggable
                          key={sequence.id}
                          draggableId={sequence.id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              className="active_div"
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                            >
                              {sequence.ownerName !== currentDoctor ? (
                                <SequenceCard
                                  name={sequence.name}
                                  key={`sequence_${index}`}
                                  id={sequence.id}
                                  ownerId={sequence.ownerId}
                                  ownerName={sequence.ownerName}
                                />
                              ) : (
                                ""
                              )}
                            </div>
                          )}
                        </Draggable>
                      );
                    })}
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
